Meteor.publishComposite('meteoris_roleGroup', function(doc, sort) {
    console.log("subscribing some Role Groups");
    return {
        find: function() {
            return Meteoris.RoleGroup.find(doc, sort);
        },
        children: [
        ],
    }
});

Meteor.publishComposite('meteoris_roleUser', function(doc, sort) {
    console.log('subscribing some Users');
    return {
        find: function() {
            return Meteor.users.find(doc, sort);
        },
        children: [],
    }
});

Meteor.publish('meteoris_roles', function(collection, action) {
    var user = Meteor.user(),
            fields = {name: 1}

    if (!user) {
        this.ready()
        return
    }

    return Meteoris.RoleGroup.findOne({
        name: group,
        roles: {
            $elemMatch: {
                actionName: action,
                collectionName: collection
            }
        }
    }, fields);
});

Meteor.methods({
    /**
     * Update Group to set Roles in group
     * @return {}
     */
    'Meteoris.Role.setRoleInGroup': function(groupId, roles) {
        try {
            Meteoris.RoleGroup.update(groupId, {
                $addToSet: {
                    roles: {
                        $each: roles
                    }
                }
            });
        } catch (exception) {
            return exception;
        }
    },
    /**
     * Remove All Role in Group by groupId
     * @return {}
     */
    'Meteoris.Role.removeAllRoleInGroup': function(groupId) {
        try {
            Meteoris.RoleGroup.update(groupId, {
                $set: {
                    roles: []
                }
            });
        } catch (exception) {
            return exception;
        }
    },
    /**
     * Check whether the user has access privileges of a role.
     * @return {Boolean} "true or false"
     */
    'Meteoris.Role.userIsInRole': function(collection, action) {
        var user = Meteor.user();
        
        if (user) {
            var group = user.profile.group;

            if (group) {
                var isInRole = Meteoris.RoleGroup.findOne({
                    name: group,
                    roles: {
                        $elemMatch: {
                            actionName: action,
                            collectionName: collection
                        }
                    }
                }, {
                    'name': 1
                });

                if (isInRole) {
                    ServerSession.set('Meteoris.Role.userIsInRole' + collection + action, true);
                    return true;
                }
            }
                        

            ServerSession.set('Meteoris.Role.userIsInRole' + collection + action, false);
            return false;
        } else {
            ServerSession.set('Meteoris.Role.userIsInRole' + collection + action, false);
            return false;
        }
    },
    'Meteoris.Role.addUsersToGroup': function(user, group) {
        var checkIsArray = isArray(user);

        if (checkIsArray) {
            for (var i = 0; i < user.length; i++) {
                Meteor.users.update(user[i], {
                    $set: {
                        'profile.group': group
                    }
                }, function(err) {
                    if (err) {
                        throw new Meteor.Error(err.message);
                    }
                });
            }
        } else {
            Meteor.users.update(user, {
                $set: {
                    'profile.group': group
                }
            }, function(err) {
                if (err) {
                    throw new Meteor.Error(err.message);
                }
            });
        }
    },
    'Meteoris.Role.removeUsersFromGroup': function(user) {
        var checkIsArray = isArray(user);

        if (checkIsArray) {
            for (var i = 0; i < user.length; i++) {
                Meteor.users.update(user[i], {
                    $unset: {
                        'profile.group': ""
                    }
                }, function(err) {
                    if (err) {
                        throw new Meteor.Error(err.message);
                    }
                });
            }
        } else {
            Meteor.users.update(user, {
                $unset: {
                    'profile.group': ""
                }
            }, function(err) {
                if (err) {
                    throw new Meteor.Error(err.message);
                }
            });
        }
    },
});

function isArray(obj) {
    return (typeof obj !== 'undefined' &&
            obj && obj.constructor === Array);
}

/**
 * Create default Group
 */

Meteor.startup(function() {
    var defaultgroups = ['admin', 'guest', 'user'];
    var groups = Meteoris.RoleGroup.find({});

    if (groups.count() === 0) {
        for (var i = 0; i < defaultgroups.length; i++) {
            var _id = Meteoris.RoleGroup.insert({
                name: defaultgroups[i]
            });

            if (_id)
                console.log("success insert default group " + defaultgroups[i]);
        }
    }
});