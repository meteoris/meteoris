Namespace('Meteoris.UserController');

Meteoris.UserController = Meteoris.Controller.extend({
    index: function() {
        var models = this.getAll();
        return {
            isEmpty: models.count() === 0 ? true : false,
            models: models,
            hasMore: this.hasMore(models)
        };
    },
    /* action getAll data */
    getAll: function() {
        return Meteor.users.find(this.getCriteria(), this.getSortLimit());
    },
    /* get sortLimit for limit & sorting collection */
    getSortLimit: function() {
        var sort = Meteoris.GridView.getSorting();
        sort.limit = this.limit();
        return sort;
    },
    /* get criteria for searching collection */
    getCriteria: function() {
        var search = FlowRouter.getQueryParam('search') ? FlowRouter.getQueryParam('search') : "";
        var criteria = {};
        if (search) {
            criteria = {
                $or: [{
                        'profile.name': {
                            $regex: search,
                            $options: 'i'
                        }
                    }, {
                        'emails.address': {
                            $regex: search,
                            $options: 'i'
                        }
                    }, ]
            }
        }
        return criteria;
    },
    /* action searching data by user input with parameter */
    search: function(t) {
        FlowRouter.go('/meteoris/user', {}, {
            limit: this.limit(),
            search: t.find('#search').value
        });
    },
    /* @override getCriteria */
    login: function(t) {
        var email = t.find('#email').value;
        var password = t.find('#password').value;

        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
            } else {
                Meteoris.Flash.set('success', 'login success');
                FlowRouter.go('/');
            }
        });
    },
    logout: function() {
        Meteor.logout(function() {
            FlowRouter.go('/meteoris/user/login');
        });
    },
    loginWithFacebook: function() {
        Meteor.loginWithFacebook({
            requestPermissions: ['publish_actions']
        }, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
            } else {
                Meteoris.Flash.set('success', 'login success');
                FlowRouter.go('/');
            }
        });
    },
    register: function(t) {
        var checkGroups = Meteor.users.findOne({});

        var email = t.find('#email').value;
        var password = t.find('#password').value;
        var name = t.find('#name').value;
        var group = checkGroups ? "user" : "admin";

        //validate field name
        if (!name || name == "") {
            var err = "Full Name may not be empty";
            Meteoris.Flash.set('danger', err);
            throw new Meteor.Error(err);
        }

        var doc = {
            email: email,
            password: password,
            profile: {
                name: name,
                group: group, //default registered user should be 2 (@/authenticated user)
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        };

        Accounts.createUser(doc, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            } else {
                Meteoris.Flash.set('success', 'register success');
                FlowRouter.go('/');
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        var group = t.find('#roleGroup').value ? t.find('#roleGroup').value : null;
        var doc = {
            email: t.find('#email').value,
            password: t.find('#password').value,
            profile: {
                name: t.find('#name').value,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        };
        if (group)
            doc.profile.group = group;

        return doc;
    },
    view: function() {
        var _id = this.getId();
        return {
            model: this.get(_id)
        }
    },
    /* event inserting data */
    post: function(t) {
        var doc = this._getDoc(t);

        Meteor.call('Meteoris.User.insert', doc, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            } else {
                Meteoris.Flash.set('success', 'Success Inserting Users');
                FlowRouter.go('/meteoris/user');
            }
        });
    },
    update: function() {
        var _id = this.getId();
        return {
            model: this.get(_id),
        }
    },
    /* event updating data */
    put: function(t) {
        var _id = this.getId();
        var roleGroup = t.find('#roleGroup').value ? t.find('#roleGroup').value : null;
        var doc = {
            'emails.0.address': t.find('#email').value,
            profile: {
                name: t.find('#name').value,
                updatedAt: new Date(),
            }
        };

        if (roleGroup)
            doc.profile.group = roleGroup;

        Meteor.users.update(_id, {
            $set: doc
        }, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            Meteoris.Flash.set('success', "Success Updating Users");
            FlowRouter.go('/meteoris/user/view/' + _id);
        });
    },
    /* action get single data */
    get: function(_id) {
        return Meteor.users.findOne(_id);
    },
    /* event removing data by id */
    delete: function(_id) {
        Meteor.users.remove(_id, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            Meteoris.Flash.set('success', "Success Removing Users");
        });
    },
    profile: function() {
        if (Meteor.user())
            var _id = Meteor.user()._id;

        return {
            model: this.get(_id)
        }
    },
    changeProfile: function(t) {
        var name = t.find('#name').value;

        Meteor.users.update(Meteor.user()._id, {
            $set: {
                'profile.name': name
            }
        }, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err.message);
            }
            Meteoris.Flash.set('success', 'Profile successfully changed');
            t.find('#name').focus();
        });
    },
    changePassword: function(t) {
        var oldPassword = t.find('#oldPassword').value;
        var newPassword = t.find('#newPassword').value;
        var confirmNewPassword = t.find('#confirmNewPassword').value;

        if (newPassword != confirmNewPassword) {
            var errMessage = 'New Password and Password Confirmation must be equal';
            Meteoris.Flash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        } else if (newPassword.length < 6) {
            var errMessage = 'New Password at least has 6 min length';
            Meteoris.Flash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }
        Accounts.changePassword(oldPassword, newPassword, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err.message);
            } else {
                Meteoris.Flash.set('success', 'Password successfully changed');
                $('#change_password_form')[0].reset();
                t.find('#oldPassword').focus();
            }
        });
    },
    forgetPassword: function(t) {
        var email = t.find('#email').value.toLowerCase();
        if (email != "") {
            Accounts.forgotPassword({
                email: email
            }, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        Meteoris.Flash.set('danger', 'This email does not exist.');
                    } else {
                        Meteoris.Flash.set('danger', 'We are sorry but something went wrong.');
                    }
                } else {
                    Meteoris.Flash.set('success', 'Email Sent. Check your mailbox.');
                }
            });

        }
        return false;

    },
    //    resetPassword: function(t) {
    //        if (this._post) {
    //            var token = this.params.token;
    //            var password = t.find('#password').value;
    //            Accounts.resetPassword(token, password, function(err) {
    //                if (err) {
    //                    MeteorisFlash.set('danger', 'We are sorry but something went wrong.');
    //                } else {
    //                    MeteorisFlash.set('success', 'Your password has been changed. Welcome back!');
    //                    Router.go('sitesIndex');
    //                }
    //            });
    //        }
    //
    //        return this.render('usersResetPassword', {
    //            data: {
    //            }
    //        });
    //    },
    /** Services */
    getServiceFacebook: function(callback) {
        var service = "facebook";
        Meteor.call("Meteoris.User.getServices", service, function(err, result) {
            if (result) {
                callback(result);
            }
        });
    },
    saveServiceFacebook: function(t) {
        var service = "facebook";
        var doc = {
            appId: t.find('#appId').value,
            secret: t.find('#appSecret').value
        };

        if (doc.appId == "" || doc.secret == "") {
            Meteoris.Flash.set("danger", "Please fill App ID and Secret");
        } else {
            Meteor.call("Meteoris.User.saveServices", service, doc, function(err, result) {
                if (err) {
                    Meteoris.Flash.set("danger", err.message);
                    throw new Meteor.Error(err)
                } else {
                    Meteoris.Flash.set("success", "Success Update Services Configuration")
                }
            })
        }
    },
});