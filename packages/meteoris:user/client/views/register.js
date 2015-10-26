var ctrl = new Meteoris.UserController();

Template.meteoris_userRegister.onCreated(function() {
   var self = this;
   self.autorun(function() {
       self.subscribe("meteoris_user", {}, {limit: 1});
   });
});

Template.meteoris_userRegister.events = {
    'click #btnRegister': function(e, t){
        e.preventDefault();        
        ctrl.register(t);
    },    
};