var ctrl = new Meteoris.UserController();

Template.meteoris_userSettings.onCreated(function() {
	var self = this;

	self.services = new ReactiveVar();

	self.autorun(function() {
		ctrl.getServiceFacebook(function(result) {
			if(result) {
				// console.log(result)
				self.services.set(result);
			}
		});
	});
});

Template.meteoris_userSettings.helpers({
	serviceFacebook: function() {
		return Template.instance().services.get();
	},
});

Template.meteoris_userSettings.events({
	'click #btnSave': function(e, t) {
		e.preventDefault();
		ctrl.saveServiceFacebook(t);
	}
});