var ctrl = new Meteoris.UserController();

Template.meteoris_userView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('meteoris_user', ctrl.getId());
    });    
});

Template.meteoris_userView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?")) {
            ctrl.delete(this._id);
            FlowRouter.go("/meteoris/user");
        }
    },
};

Template.meteoris_userView.helpers({
    model: function(){        
        return ctrl.view().model;
    }
});