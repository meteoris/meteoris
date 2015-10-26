var ctrl = new Meteoris.ThemeAdminController();

Template.meteoris_themeAdminRegister.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('meteoris_themeAdmin', ctrl.getId());
    });    
});

Template.meteoris_themeAdminRegister.helpers({
    model: function(){
        return ctrl.register().model;
    },    
});