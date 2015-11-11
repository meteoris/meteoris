Template.meteoris_backupRestoreIndex.onCreated(function() {
   console.log(Uploader); 
});

Template.meteoris_backupRestoreIndex.helpers({
    myCallbacks: function() {
        return {
            finished: function(index, fileInfo, context) {
                // console.log(fileInfo.name)
                // console.log(fileInfo)
                Meteor.call("Meteoris.BackupRestore.restore", fileInfo.name, function(err, result) {
                    if (err) {
                        console.log(err);
                        throw new Meteor.Error(err.message);
                        Meteoris.Flash.set("danger", "Gagal Melakukan Restore Database");
                    } else {
                        //Meteor.call("Backup.deleteTempFileUpload", fileInfo.path);
                        Meteoris.Flash.set("success", "Berhasil Melakukan Restore Database");
                    }
                });
            },
        }
    }
});

Template.meteoris_backupRestoreIndex.events({
    'click #btnBackup': function(e) {
        e.preventDefault();

        if (confirm("Apa anda yakin akan membackup database?")) {
            Meteor.call("Meteoris.BackupRestore.dump", function(err, result) {
                if (err) {
                    console.log(err);
                    throw new Meteor.Error(err.message);
                    Meteoris.Flash.set("danger", "Gagal Melakukan Backup Database");
                } else {
                    Meteoris.Flash.set("success", "Berhasil Membackup Database");
                }
            })
        }
    },
});