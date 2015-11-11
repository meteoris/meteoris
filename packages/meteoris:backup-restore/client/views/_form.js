var ctrl = new Meteoris.BackupRestoreController();

Template.meteoris_backupRestore_form.onCreated(function () {
    var self = this;
    
    console.log("form created")
    
    self.autorun(function () {
        self.subscribe("meteoris_backupRestoreConfig", {}, {});
    });

    self.config = function () {
        return Meteoris.BackupRestoreConfig.findOne({});
    };
});

Template.meteoris_backupRestore_form.helpers({
    /* show error message on view */
    error: function (field) {
        return Meteoris.FormValidation.error(Meteoris.BackupRestoreConfig, field);
    },
    config: function() {
        return Template.instance().config();
    }
});

Template.meteoris_backupRestore_form.events({
    'click #btnSave': function(e, t) {
        e.preventDefault();
        ctrl.save(t);
    }
});