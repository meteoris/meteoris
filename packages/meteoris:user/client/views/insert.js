var ctrl = new Meteoris.UserController();

Template.meteoris_userInsert.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();        
        ctrl.post(t);
    },
};