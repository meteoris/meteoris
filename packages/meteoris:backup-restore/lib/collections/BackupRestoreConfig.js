Namespace('Meteoris.BackupRestoreConfig');

Meteoris.BackupRestoreConfig = new Mongo.Collection('meteoris_backupRestoreConfig');

var schemas = new SimpleSchema({
    host: {
        type: String,
        label: "Host"
    },
    port: {
        type: String,
        label: "Port"
    },
    path: {
        type: String,
        label: "Path"
    },
    username: {
        type: String,
        label: "Username",
        optional: true
    },
    password: {
        type: String,
        label: "Pasword",
        optional: true
    },
    database: {
        type: String,
        label: "Database"
    },
    pathUpload: {
        type: String,
        label: "Path Upload"
    },
    /* AUTOVALUE */
    createdAt: {
        type: Date,
        label: "Created Date",
        autoValue: function() {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    },
    updatedAt: {
        type: Date,
        label: "Updated Date",
        autoValue: function() {
            return new Date();
        },
        optional: true
    },
});

Meteoris.BackupRestoreConfig.attachSchema(schemas);

Meteoris.BackupRestoreConfig.allow({
    insert: function(userId, doc) {
       
    },
    update: function(userId, doc) {
        return userId ? true : false;
    },
    remove: function(userId, doc) {
       
    },
});