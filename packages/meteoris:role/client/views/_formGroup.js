var ctrl = new Meteoris.RoleController();

Template.meteoris_roleFormGroup.events({
	'click #btnSave': function(e, t) {
        e.preventDefault();
        ctrl.insertGroup(t);   
    },
});

Template.meteoris_roleFormGroup.helpers({
	/* show error message on view */
    error: function(field) {
        return Meteoris.FormValidation.error(Meteoris.RoleGroup, field);
    },
})