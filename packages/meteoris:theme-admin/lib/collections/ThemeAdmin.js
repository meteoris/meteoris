/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Namespace('Meteoris.ThemeAdmin');

Meteoris.ThemeAdmin = new Mongo.Collection("meteoris_themeAdmin");

var schemas = new SimpleSchema({
    logoLarge: {
        type: String,
        label: "Logo Large",
    },
    logoMini: {
        type: String,
        label: "Logo Mini",
    },
    skin: {
        type: String,
        label: "Skin",
    },
    fixed: {
        type: Boolean,
        label: "Fixed",
    },
    sidebarMini: {
        type: Boolean,
        label: "Sidebar Mini",
    },
    footerText: {
        type: String,
        label: "Footer Text",
    },
//    menus: {
//        type: [Object],
//    },
//    "menus.$._id": {
//        type: String,
//        autoValue: function() {
//            var d = new Date().getTime();
//            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//                var r = (d + Math.random() * 16) % 16 | 0;
//                d = Math.floor(d / 16);
//                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//            });
//            return uuid;
//        },
//        optional: true
//    },
//    "menus.$.title": {
//        type: String
//    },
//    "menus.$.url": {
//        type: String
//    },
//    "menus.$.icon": {
//        type: String,
//        optional: true
//    },
    /* AUTOVALUE */
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    },
    updatedAt: {
        type: Date,
        label: "Updated At",
        autoValue: function() {
            if (this.isUpdate || this.isInsert)
                return new Date();
        },
        optional: true
    },
    createdBy: {
        type: String,
        label: "Created by",
        autoValue: function() {
            if (this.isInsert && this.userId)
                return Meteor.user()._id;
        },
        denyUpdate: true,
        optional: true
    },
    updatedBy: {
        type: String,
        label: "Updated by",
        autoValue: function() {
            if ((this.isUpdate || this.isInsert) && this.userId)
                return Meteor.user()._id;
        },
        optional: true
    },
});

Meteoris.ThemeAdmin.attachSchema(schemas);

Meteoris.ThemeAdmin.allow({
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