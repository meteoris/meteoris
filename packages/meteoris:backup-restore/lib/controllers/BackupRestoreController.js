/*
 create a namespace called Meteoris.SiteController
 */
Namespace('Meteoris.BackupRestoreController');

/**
 Create controller which extends Meteoris Controller
 */
Meteoris.BackupRestoreController = Meteoris.Controller.extend({
    constructor: function () {
    },
    /* save changes config */
    save: function (t) {
        var doc = this._getDoc(t);

        Meteoris.BackupRestoreConfig.update(doc.id, {$set: doc}, function (err, res) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            } else {
                Meteor.call("Meteoris.BackupRestore.initUploadServer");
                Meteoris.Flash.set('success', "Success Save Changes Configuration");
            }
        });
    },
    _getDoc: function(t) {
        return {
            id: t.find('#id').value,
            host: t.find('#host').value,
            port: t.find('#port').value,
            database: t.find('#database').value,
            username: t.find('#username').value,
            password: t.find('#password').value,
            path: t.find('#path').value,
            pathUpload: t.find('#pathUpload').value
        };
    }
});