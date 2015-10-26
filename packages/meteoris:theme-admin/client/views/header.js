var ctrl = new Meteoris.ThemeAdminController();

Template.meteoris_themeAdminHeader.helpers({
    model: function(){
        return ctrl.header().model;
    },    
});