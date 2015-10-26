var ctrl = new Meteoris.UserController();

Template.meteoris_userLogin.events = {
//    'click #btnLogin': function(e, t){
    'submit #loginForm': function(e, t) {
        e.preventDefault();        
        ctrl.login(t);
    },    
    'click #btnLoginFacebook': function(e, t){
        e.preventDefault();        
        ctrl.loginWithFacebook(t);
    },    
};