var ctrl = new Meteoris.UserController();

Template.meteoris_themeAdmin_hookNavbar.events = {
    'click #btnLogout': function(){
        ctrl.logout();
    }
};


