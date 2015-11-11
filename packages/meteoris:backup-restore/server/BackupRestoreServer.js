spawn = Npm.require('child_process').spawn;

var BackupRestore = {
    /**
     * dump database
     * @return {[type]} [description]
     */
    dump: function () {
        var host = Meteoris.BackupRestoreConfig.host;
        var port = Meteoris.BackupRestoreConfig.port;
        var out = Meteoris.BackupRestoreConfig.path;
        var username = Meteoris.BackupRestoreConfig.username;
        var password = Meteoris.BackupRestoreConfig.password;
        var database = Meteoris.BackupRestoreConfig.database;

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
        var tempDir = "backup-db";

        //delte temp dir if exist
        var deleteTempDir = "sudo rm -rf " + path + tempDir;
        var diff = spawn('bash', ['-c', deleteTempDir]);
        diff.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        var path = Meteoris.BackupRestoreConfig.path;
        var pathUpload = Meteoris.BackupRestoreConfig.pathUpload;
        var host = Meteoris.BackupRestoreConfig.host;
        var port = Meteoris.BackupRestoreConfig.port;
        var out = Meteoris.BackupRestoreConfig.path;
        var username = Meteoris.BackupRestoreConfig.username;
        var password = Meteoris.BackupRestoreConfig.password;
        var database = Meteoris.BackupRestoreConfig.database;

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
    /**
     * init upload server package
     * @type {[type]}
     */
    UploadServer.init({
        tmpDir: Meteoris.BackupRestoreConfig.pathUpload + '/tmp',
        uploadDir: Meteoris.BackupRestoreConfig.pathUpload,
        checkCreateDirectories: true, //create the directories for you
        overwrite: true,
    })
});