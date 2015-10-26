var ctrl = new Meteoris.UserController();

Template.meteoris_userProfile.events = {
    'click #btnChangeProfile': function(e, t){
        e.preventDefault();        
        ctrl.changeProfile(t);
    },
    'click #btnChangePassword': function(e, t){
        e.preventDefault();        
        ctrl.changePassword(t);
    }
};

Template.meteoris_userProfile.helpers({
    model: function() {
        return ctrl.profile().model;
    }
});