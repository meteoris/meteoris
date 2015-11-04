Namespace('Meteoris.RoleGroup');

Meteoris.RoleGroup = new Mongo.Collection('meteoris_roleGroup');

var schemas = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
    },
    description: {
        type: String,
        label: 'Description',
        optional: true,
    },
    roles: {
        type: [Object],
        label: "Role",
        optional: true
    },
    "roles.$.collectionName": {
        type: String,
        label: "Collection Name",
        optional: true
    },
    "roles.$.actionName": {
        type: String,
        label: "Action Name",
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