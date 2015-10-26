var ctrl = new Meteoris.ThemeAdminController();

Template.meteoris_themeAdminLogin.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('meteoris_themeAdmin', ctrl.getId());
    });
});

Template.meteoris_themeAdminLogin.helpers({
    model: function() {
        return ctrl.login().model;
    },
});