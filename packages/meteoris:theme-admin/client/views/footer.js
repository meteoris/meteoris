var ctrl = new Meteoris.ThemeAdminController();

Template.meteoris_themeAdminFooter.helpers({
    model: function(){
        return ctrl.footer().model;
    },    
});