var ctrl = new Meteoris.RoleController();

Template.meteoris_roleFormCollection.events({
	'click #btnSave': function(e, t) {
        e.preventDefault();
        ctrl.insertCollection(t);   
    },
});

Template.meteoris_roleFormCollection.helpers({
	/* show error message on view */
    error: function(field) {
        return Meteoris.FormValidation.error(Meteoris.RoleCollection, field);
    },
})