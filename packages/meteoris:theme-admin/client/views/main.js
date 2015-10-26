var ctrl = new Meteoris.ThemeAdminController();

Template.meteoris_themeAdminMain.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('meteoris_themeAdmin', ctrl.getId());
    });    
});

Template.meteoris_themeAdminMain.helpers({
    model: function(){
        return ctrl.main().model;
    },    
});