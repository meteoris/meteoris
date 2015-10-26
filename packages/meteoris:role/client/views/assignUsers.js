var ctrl = new Meteoris.RoleController();

Template.meteoris_roleAssignUsers.events({
    /**
     * check/uncheck all checkbox in users list
     * @return 
     */
    'change #checkAllUsersNotInGroup': function(e, t) {
        e.preventDefault();
        var checkboxes = $('.checkAllUsersNotInGroup');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = e.target.checked;
        }
    },
    /**
     * check/uncheck all checkbox in users in group list
     * @return {}
     */
    'change #checkAllUsersInGroup': function(e, t) {
        e.preventDefault();
        var checkboxes = $('.checkAllUsersInGroup');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = e.target.checked;
        }
    },
    /**
     * Add group to user which checked
     * @return {}
     */
    'click #btnAddUserInGroup': function(e, t) {
        e.preventDefault();
        var checkboxes = $('.checkAllUsersNotInGroup:checked');
        var group = ctrl.getGroup();

        // loop over them all
        if (checkboxes.length > 0) {
            var users = [];

            for (var i = 0; i < checkboxes.length; i++) {
                // console.log($(checkboxes[i]).val())
                users.push($(checkboxes[i]).val());
            }

            Meteor.call("Meteoris.Role.addUsersToGroup", users, group, function(err, result) {
                if (err) {
                    throw new Meteor.Error(err.message);
                    Meteoris.Flash.set("danger", err.message);
                } else {
                    Meteoris.Flash.set("success", "Success add users to group");
                }
            });

            //set checkAll header to uncheck
            $('#checkAllUsersNotInGroup').prop("checked", false);
            $('.checkAllUsersNotInGroup').prop("checked", false);
        } else {
            Meteoris.Flash.set("danger", "Please Select Some User which You Want to Add to Group")
        }
    },
    /**
     * Remove group from user which checked
     * @return {}
     */
    'click #btnRemoveUserInGroup': function(e, t) {
        e.preventDefault();
        var checkboxes = $('.checkAllUsersInGroup:checked');

        // loop over them all
        if (checkboxes.length > 0) {
            var users = [];

            for (var i = 0; i < checkboxes.length; i++) {
                // console.log($(checkboxes[i]).val())
                users.push($(checkboxes[i]).val());
            }

            Meteor.call("Meteoris.Role.removeUsersFromGroup", users, function(err, result) {
                if (err) {
                    throw new Meteor.Error(err.message);
                    Meteoris.Flash.set("danger", err.message);
                } else {
                    Meteoris.Flash.set("success", "Success remove users from group");
                }
            });

            //set checkAll header to uncheck
            $('#checkAllUsersInGroup').prop("checked", false);
            $('.checkAllUsersInGroup').prop("checked", false);
        } else {
            Meteoris.Flash.set("danger", "Please Select Some User which You Want to Remove from Group")
        }
    }
});

Template.meteoris_roleAssignUsers.helpers({
    /**
     * Get group name from params router
     * @return {String} [group name]
     */
    'group': function() {     
        return ctrl.getGroup();
    },
});

Template.meteoris_roleAssignUsers.onCreated(function() {

});

/** 
 * Template for list user in group
 * @return {}
 */
Template.meteoris_roleUsersListInGroup.onCreated(function() {
    var self = this;
    var group = ctrl.getGroup();

    self.loaded = new ReactiveVar(0);
    self.limit = new ReactiveVar(5);

    
    self.autorun(function() {
        var limit = self.limit.get();
        var subscription = self.subscribe('meteoris_roleUser', {
            'profile.group': group
        }, {
            limit: limit
        });

        //if subscription is ready set limit to newLimit
        if (subscription.ready()) {
            self.loaded.set(limit);
        }
    });

    self.users = function() {
        return Meteor.users.find({
            'profile.group': group
        }, {
            limit: self.loaded.get()
        });
    }
});

Template.meteoris_roleUsersListInGroup.helpers({
    /**
     * Get Users List has a group name by params
     * @return {} []
     */
    users: function() {
        return Template.instance().users();
    },
    //are there more posts to show?
    hasMore: function() {
        return Template.instance().users().count() >= Template.instance().limit.get();
    }
});
Template.meteoris_roleUsersListInGroup.events({
    'click .load-more': function(event, template) {
        event.preventDefault();

        //get current value for limit, i.e, how many posts are currently displayed
        var limit = template.limit.get();

        //increase limit by 5 and update it
        limit += 5;
        template.limit.set(limit);
    }
});
/** 
 * Eof Template for list user in group
 */


/** 
 * Template for list user not in group
 * @return {}
 */
Template.meteoris_roleUsersListNotInGroup.onCreated(function() {
    var self = this;

    self.loaded = new ReactiveVar(0);
    self.limit = new ReactiveVar(5);

    self.autorun(function() {
        var limit = self.limit.get();
        var subscription = self.subscribe('meteoris_roleUser', {
            'profile.group': {
                $exists: false
            }
        }, {
            limit: limit
        });

        //if subscription is ready set limit to newLimit
        if (subscription.ready()) {
            self.loaded.set(limit);
        }
    });

    self.users = function() {
        return Meteor.users.find({
            'profile.group': {
                $exists: false
            }
        }, {
            limit: self.loaded.get()
        });
    }

});

Template.meteoris_roleUsersListNotInGroup.helpers({
    /**
     * Get Users List not in group
     * @return {} []
     */
    users: function() {
        return Template.instance().users();
    },
    //are there more users to show?
    hasMore: function() {
        return Template.instance().users().count() >= Template.instance().limit.get();
    }
});

Template.meteoris_roleUsersListNotInGroup.events({
    'click .load-more': function(event, template) {
        event.preventDefault();

        //get current value for limit, i.e, how many posts are currently displayed
        var limit = template.limit.get();

        //increase limit by 5 and update it
        limit += 5;
        template.limit.set(limit);
    }
});

/** 
 * Eof Template for list user not in group
 */