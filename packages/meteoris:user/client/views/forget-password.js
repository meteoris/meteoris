var ctrl = new Meteoris.UserController();

Template.meteoris_userForgetPassword.events = {
    'click #btnForgetPassword': function(e, t){
        e.preventDefault();         
        ctrl.forgetPassword(t);
    },        
};