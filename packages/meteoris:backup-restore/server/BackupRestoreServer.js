Meteor.publishComposite('meteoris_backupRestoreConfig', function (doc, sort) {
    console.log("subscribing some meteoris backup restore config with it's relation");
    var doc = doc || {};
    var sort = sort || {};
    return{
        find: function () {
            return Meteoris.BackupRestoreConfig.find(doc, sort);
        }
    };
});

spawn = Npm.require('child_process').spawn;

var BackupRestore = {
    getConfig: function () {
        return Meteoris.BackupRestoreConfig.findOne({});
    },
    /**
     * dump database
     * @return {[type]} [description]
     */
    dump: function () {
        var config = this.getConfig();
        var host = config.host;
        var port = config.port;
        var out = config.path;
        var username = config.username ? config.username : "";
        var password = config.password ? config.password : "";
        var database = config.database;

        var dateString = moment(new Date()).format("YYYY-MM-DD_h:mm:ss");
        var filenameBackupDB = "db-" + dateString;

        if (username != "" && password != "") {
            // exec("mongodump --host " + host + " --port " + port + " --username " + username + " --password " + password + " --db " + database + " --out " + out + filenameBackupDB + " && tar -czf " + out + filenameBackupDB + ".tar.gz -C " + out + filenameBackupDB + " . && rm -rf " + out + filenameBackupDB, this.runCommand);
            var command = "mongodump --host " + host + " --port " + port + " --username " + username + " --password " + password + " --db " + database + " --out " + out + filenameBackupDB + " && tar -czf " + out + filenameBackupDB + ".tar.gz -C " + out + filenameBackupDB + " . && rm -rf " + out + filenameBackupDB;
        } else {
            // exec("mongodump --host " + host + " --port " + port + " --db " + database + " --out " + out + filenameBackupDB + " && tar -czf " + out + filenameBackupDB + ".tar.gz -C " + out + filenameBackupDB + " . && rm -rf " + out + filenameBackupDB, this.runCommand);
            var command = "mongodump --host " + host + " --port " + port + " --db " + database + " --out " + out + filenameBackupDB + " && tar -czf " + out + filenameBackupDB + ".tar.gz -C " + out + filenameBackupDB + " . && rm -rf " + out + filenameBackupDB;
        }

        var diff = spawn('bash', ['-c', command]);
        diff.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        diff.stderr.on('data', function (data) {
            console.error('stderr: ' + data);
        });
    },
    restore: function (filename) {
        var config = this.getConfig();
        var tempDir = "backup-db";

        //delte temp dir if exist
        var deleteTempDir = "sudo rm -rf " + path + tempDir;
        var diff = spawn('bash', ['-c', deleteTempDir]);
        diff.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        var path = config.path;
        var pathUpload = config.pathUpload;
        var host = config.host;
        var port = config.port;
        var out = config.path;
        var username = config.username ? config.username : "";
        var password = config.password ? config.password : "";
        var database = config.database;

        /**
         * first create temp directory
         * then extract file db to temp directory
         * after that, restore database,
         * and the last, remove temp directory
         */
        if (username != "" && password != "") {
            // exec("mkdir " + path + tempDir + " && tar xf " + pathUpload + filename + " -C " + path + tempDir + " && mongorestore -h " + host + " --port " + port + " --username " + username + " --password " + password + " -d " + database + " " + path + tempDir + "/" + database + " && rm -rf " + path + tempDir, this.runCommand);
            var command = "mkdir " + path + tempDir + " && tar xf " + pathUpload + filename + " -C " + path + tempDir + " && mongorestore -h " + host + " --port " + port + " --username " + username + " --password " + password + " -d " + database + " --drop " + path + tempDir + "/" + database + " && rm -rf " + path + tempDir;
        } else {
            // exec("mkdir " + path + tempDir + " && tar xf " + pathUpload + filename + " -C " + path + tempDir + " && mongorestore -h " + host + " --port " + port + " -d " + database + " " + path + tempDir + "/meteor && rm -rf " + path + tempDir, this.runCommand);
            var command = "mkdir " + path + tempDir + " && tar xf " + pathUpload + filename + " -C " + path + tempDir + " && mongorestore -h " + host + " --port " + port + " -d " + database + " --drop " + path + tempDir + "/meteor && rm -rf " + path + tempDir;
        }

        var diff = spawn('bash', ['-c', command]);
        diff.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        diff.stderr.on('data', function (data) {
            console.error('stderr: ' + data);
        });

    },
    runCommand: function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    },
};


Meteor.methods({
    "Meteoris.BackupRestore.dump": function () {
        return BackupRestore.dump();
    },
    "Meteoris.BackupRestore.restore": function (filename) {
        console.log("restore database..");
        BackupRestore.restore(filename);
    },
    "Meteoris.BackupRestore.deleteTempFileUpload": function (path) {
        UploadServer.delete(path);
    },
    "Meteoris.BackupRestore.initUploadServer": function () {
        var config = Meteoris.BackupRestoreConfig.findOne({});

        if (config) {
            UploadServer.init({
                tmpDir: config.pathUpload + '/tmp',
                uploadDir: config.pathUpload,
                checkCreateDirectories: true, //create the directories for you
                overwrite: true
            });
        }
    }
});

/* observing collection */
/* uncomment to use
 var query = Backup.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */

Meteor.startup(function () {
    var config = Meteoris.BackupRestoreConfig.findOne({});

    if (!config) {
        //insert default config
        Meteoris.BackupRestoreConfig.insert({
            host: "localhost",
            port: "3001",
            path: process.env.PWD + '/.dump/',
            pathUpload: process.env.PWD + '/.uploads/',
            username: "",
            password: "",
            database: "meteor"
        }, function (err, result) {
            if (err) {
                throw new Meteor.Error(err);
            } else {
                console.log("insert default config for meteoris:backup-restore package");
            }
        });

    }

    var tmpDir = config ? config.pathUpload + '/tmp' : process.env.PWD + '/.uploads/tmp';
    var uploadDir = config ? config.pathUpload : process.env.PWD + '/.uploads/';

    /**
     * init upload server package
     * @type {[type]}
     */
    UploadServer.init({
        tmpDir: tmpDir,
        uploadDir: uploadDir,
        checkCreateDirectories: true, //create the directories for you
        overwrite: true
    });


});