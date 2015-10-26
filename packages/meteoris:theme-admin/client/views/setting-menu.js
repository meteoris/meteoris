var ctrl = new Meteoris.ThemeAdminController();

Template.meteoris_themeAdminSettingMenu.helpers({
    /* show error message on view */
    error: function(field) {
        return Meteoris.FormValidation.error(Meteoris.ThemeAdmin, field);
    },
    model: function() {
        return ctrl.settingMenu().model;
    }
});

Template.meteoris_themeAdminSettingMenu.events = {
    'click #btnPushToMenu': function(e, t) {
        e.preventDefault();
        ctrl.pushToMenus(t);
    },
};