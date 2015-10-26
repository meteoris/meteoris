Template.meteoris_user_form.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('meteoris_roleGroup', {}, {sort: {name: 1}});
    });    
});

Template.meteoris_user_form.helpers({    
    roleGroups: function(){
        return Meteoris.RoleGroup.find({}, {sort: {name: 1}});
    }
});