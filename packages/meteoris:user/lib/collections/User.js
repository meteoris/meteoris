//activate groundDB for users collection to work offline
//GroundDB(Meteor.users);
Meteor.users.allow({
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