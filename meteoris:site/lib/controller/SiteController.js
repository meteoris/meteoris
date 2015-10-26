/*
create a namespace called Meteoris.SiteController
*/
Namespace('Meteoris.SiteController');

/**
Create controller which extends Meteoris Controller
*/
Meteoris.SiteController = Meteoris.Controller.extend({
    constructor : function() {
            // set default counter at constructor
            Session.setDefault('counter', 0);
        },
        /* passing data to index helpers template */
    index: function() {                 
        //return some value, to be passed on index.js
        return {
            counter: this.getCounter(),
            myName: "Ega Radiegtya",
            myHobby: "Drinking Coffee"
        };
    },
    getCounter: function(){
        return Session.get("counter");
    },
    setCounter: function(counter){
        Session.set('counter', this.getCounter() + 1);
    }
});