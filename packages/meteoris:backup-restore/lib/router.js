/* Backup */

/* router level validation, only allow user with group "admin" to access this page */
function authenticating() {
//    if (!Meteoris.Role.userIsInGroup("admin")) {
//        Meteoris.Flash.set("danger", "403 Unauthenticated");
//        FlowRouter.go("/");
//    }
}

FlowRouter.route('/meteoris/backup-restore', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_backupRestoreIndex"});
    },
});
/* EOF Backup */