Namespace('Meteoris.RoleCollection');

Meteoris.RoleCollection = new Mongo.Collection('meteoris_roleCollection');

var schemas = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
    },
    actions: {
        type: [Object],
        label: 'Action',
        optional: true
    },
    "actions.$.name": {
        type: String,
        label: 'Name Action',
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

Meteoris.RoleCollection.attachSchema(schemas);

Meteoris.RoleCollection.allow({
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