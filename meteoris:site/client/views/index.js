var ctrl = new Meteoris.SiteController();

Template.meteoris_siteIndex.onCreated(function(){
    console.log(Meteoris.User.isExist());
})

/**
In the template helper section we are using index() method to get object return value from controller. It's because index was the action and also the file name suffix. This structure will make You easier to get jobs done, when your team getting bigger and the code getting bigger.
*/
Template.meteoris_siteIndex.helpers({
    myName: function () {        
        return ctrl.index().myName;
    },
    myHobby: function () {
        return ctrl.index().myHobby;
    },  
    counter: function () {
      return ctrl.index().counter;
    }
  });

/**
in the template events, we don't need to use index() method to call any action. Because it just simply method calling through controller.
*/
Template.meteoris_siteIndex.events({
    'click button': function () {
      //increment the counter when button is clicked
      ctrl.setCounter();      
    }
});