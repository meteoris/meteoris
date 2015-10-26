var userRoutes = FlowRouter.group({
    prefix: '/meteoris/user',
    name: 'meteoris_user',
    triggersEnter: [function(context, redirect) {
            authenticating(context.path);
        }]
});

/* router level validation, only allow user with group "admin" to access this page */
function authenticating(path) {
    var except = [
        '/meteoris/user/login',
        '/meteoris/user/register',
        '/meteoris/user/profile'
    ];

    if (except.indexOf(path) == -1) {
        if (!Meteoris.Role.userIsInGroup("admin")) {
            Meteoris.Flash.set("danger", "403 Unauthenticated");
            FlowRouter.go("/");
        }
    }
}

/* USERS */
userRoutes.route('/', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_userIndex"});
    },
});

userRoutes.route('/login', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminLogin', {content: "meteoris_userLogin"});
    },
});

userRoutes.route('/register', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminRegister', {content: "meteoris_userRegister"});
    },
});

userRoutes.route('/insert', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_userInsert"});
    },
});

userRoutes.route('/update/:id', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_userUpdate"});
    },
});

userRoutes.route('/forget-password', {
    action: function() {
        console.log("forget password page")
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_userForgetPassword"});
    },
});

userRoutes.route('/view/:id', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_userView"});
    },
});

userRoutes.route('/profile', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_userProfile"});
    },
});

userRoutes.route('/reset-password/:token', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_userResetPassword"});
    },
});

userRoutes.route('/settings', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_userSettings"});
    },
});

/* EOF USERS */