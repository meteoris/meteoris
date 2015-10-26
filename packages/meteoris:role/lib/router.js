var roleRoutes = FlowRouter.group({
    prefix: '/meteoris/role',
    name: 'meteoris_role',
    triggersEnter: [authenticating]
});

/* router level validation, only allow user with group "admin" to access this page */
function authenticating() {
    if (!Meteoris.Role.userIsInGroup("admin")) {
        Meteoris.Flash.set("danger", "403 Unauthenticated");
        FlowRouter.go("/");
    }
}

roleRoutes.route('/', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_roleIndex"});
    },
});

roleRoutes.route('/assign-users/:group', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_roleAssignUsers"});
    },
});






