var ctrl = new Meteoris.RoleController();

Template.meteoris_roleIndex.onCreated(function() {
    var self = this;

    self.autorun(function() {
        //subscribe role group
        self.subscribe("meteoris_roleGroup", {}, {
            sort: {
                name: 1
            }
        });
        //subscribe role collection
        self.subscribe("meteoris_roleCollection", {}, {
            sort: {
                name: 1
            }
        });
    });
});

Template.meteoris_roleIndex.helpers({
    //the groups cursor
    groups: function() {
        return ctrl.index().groups;
    },
    //the collections cursor
    collections: function() {
        return ctrl.index().collections;
    },
    /**
     * check if action already registered at meteoris group roles
     * @return {String} "checked"
     */
    isCheckedAction: function(roles, collectionName) {
        var checked = "";
        if (roles) {
            var actionName = this.name;
            roles.forEach(function(obj) {
                if (checked == "") {
                    if (collectionName == obj.collectionName && actionName == obj.actionName) {
                        checked = "checked";
                    }
                }
            });
        }

        return checked;
    },
    isGuest: function(group) {
        if (group == "guest")
            return true;
    }
});

Template.meteoris_roleIndex.events({
    'change .checkAllCollection': function(e, t) {
        e.preventDefault();
        var groupName = e.currentTarget.value;
        var checked = e.currentTarget.checked;
        var collections = ctrl.getAllCollection();

        collections.forEach(function(obj) {
            var collectionName = obj.name;

            $("input[name=" + groupName + "-" + collectionName + "]").prop("checked", checked);
            $(".checkbox-" + groupName + "-" + collectionName).prop("checked", checked);
        });
    },
    'change .checkAllAction': function(e, t) {
        e.preventDefault();
        var child = e.currentTarget.dataset.child;

        var checkboxes = $('.checkbox-' + child);
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = e.target.checked;
        }
    },
    'click .btnAddRole': function(e, t) {
        var collectionId = this._id;
        var collectionName = this.name;
        var name = $("#role-" + collectionName).val().replace(/ /g, '_');

        if (name != "") {
            ctrl.insertCollectionAction(collectionId, name);
            $("#role-" + collectionName).val("");
        }
    },
    'click .btnRemoveRole': function(e, t) {
        var collectionId = this._id;
        var collectionName = this.name;

        var actionName = $("#remove-role-" + collectionName).val();

        if (actionName != "") {
            ctrl.deleteCollectionAction(collectionId, collectionName, actionName);
        }
    },
    'click .btnSaveRoleGroup': function(e, t) {
        e.preventDefault();
        var groupName = this.name;
        var groupId = this._id;
        var collections = ctrl.getAllCollection();

        //remove array first
        Meteor.call("Meteoris.Role.removeAllRoleInGroup", groupId);

        collections.forEach(function(obj) {
            var checkboxes = $('.checkbox-' + groupName + '-' + obj.name + ":checked");
            var roles = [];

            //if check greater than 0, push value in roles
            if (checkboxes.length > 0) {
                for (var i = 0; i < checkboxes.length; i++) {
                    roles.push({
                        collectionName: obj.name,
                        actionName: $(checkboxes[i]).val()
                    });
                }
            }

            //insert role in group
            Meteor.call("Meteoris.Role.setRoleInGroup", groupId, roles, function(error, response) {
                if (error) {
                    throw new Meteor.Error(error.reason);
                }
            });

            Meteoris.Flash.set("success", "Success insert roles in group " + groupName);

            //set checkAll header to uncheck
            // checkboxes.attr("checked", false);
        });
    },
    'click .btn-remove-group': function(e, t) {
        e.preventDefault();
        var groupId = this._id;
        
        if (confirm("Are you sure want to remove this data?")) {
            ctrl.deleteGroup(groupId);
        }
        
    },
    'click .btn-remove-collection': function(e, t) {
        var collectionId = this._id;
        var collectionName = this.name;
        
        if (confirm("Are you sure want to remove this data?")) {
            ctrl.deleteCollection(collectionId, collectionName);
        }
    }
});