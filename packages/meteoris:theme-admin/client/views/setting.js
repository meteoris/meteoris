var ctrl = new Meteoris.ThemeAdminController();

Template.meteoris_themeAdminSetting.helpers({
    /* show error message on view */
    error: function(field) {
        return Meteoris.FormValidation.error(Meteoris.ThemeAdmin, field);
    },
    isSelectedSkin: function(value) {
        if (this.skin == value)
            return "selected";
    },
    isSelectedFixed: function(value) {
        if (this.fixed == value)
            return "selected";
    },
    isSelectedSidebarMini: function(value) {
        if (this.sidebarMini == value)
            return "selected";
    },
    model: function(){
        return ctrl.setting().model;
    },
    menus: function(){
        return ctrl.setting().model.menus;
    }
});

Template.meteoris_themeAdminSetting.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        ctrl.put(t);
    },
    'click #btnUpdateMenu': function(e){
        e.preventDefault();
        ctrl.setMenuId(this._id);
    }
};