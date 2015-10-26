var groupRoutes = FlowRouter.group({
    prefix: '/meteoris',
    name: 'meteoris',
    triggersEnter: [authenticating]
});

/* router level validation, only allow user with group "admin" to access this page */
function authenticating() {    
    if (!Meteoris.Role.userIsInGroup("admin")){
        Meteoris.Flash.set("danger", "403 Unauthenticated");
        FlowRouter.go("/");
    }
}

groupRoutes.route('/theme-admin/setting', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_themeAdminSetting"});
    },
});