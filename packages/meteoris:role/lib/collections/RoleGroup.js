Namespace('Meteoris.RoleGroup');

Meteoris.RoleGroup = new Mongo.Collection('meteoris_roleGroup');

var schemas = new SimpleSchema({
    name: {
        type: String,
        label: 'Nama',
    },
    description: {
        type: String,
        label: 'Deskripsi',
        optional: true,
    },
    roles: {
        type: [Object],
        label: "Role",
        optional: true
    },
    "roles.$.collectionName": {
        type: String,
        label: "Nama Koleksi",
        optional: true
    },
    "roles.$.actionName": {
        type: String,
        label: "Nama Aksi",
        optional: true
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

Meteoris.RoleGroup.attachSchema(schemas);

Meteoris.RoleGroup.allow({
    insert: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
    update: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
    remove: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
});