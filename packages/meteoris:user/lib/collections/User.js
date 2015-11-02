//activate groundDB for users collection to work offline
//GroundDB(Meteor.users);
Meteor.users.allow({
    insert: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
    update: function(userId, doc) {
        return userId == doc._id;
    },
    remove: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
});