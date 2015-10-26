ctrl = new Meteoris.UserController();

Template.meteoris_userUpdate.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('meteoris_user', ctrl.getId());
        self.subscribe('meteoris_roleGroup', { name: { $ne: "guest" } }, {sort: {name: 1}});
    });
});

Template.meteoris_userUpdate.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        ctrl.put(t);
    },
};

Template.meteoris_userUpdate.helpers({
    model: function() {
        return ctrl.update().model;
    },
    isSelected: function(name) {
        if (this.name === name)
            return "selected";
    },
    roleGroups: function() {
        return Meteoris.RoleGroup.find({ name: { $ne: "guest" } }, {sort: {name: 1}});
    }
});