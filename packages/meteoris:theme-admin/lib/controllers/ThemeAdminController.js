Namespace('Meteoris.ThemeAdminController');

Meteoris.ThemeAdminController = Meteoris.Controller.extend({
    _id: "setting",
//    _menuId: "",
//    deps: new Tracker.Dependency,
    /* ovverride getId from Meteoris Controller */
    getId: function() {
        return this._id;
    },
    /* passing data to setting helpers template */
    setting: function() {
        var _id = this.getId();
        return {
            model: this.get(_id),
        }
    },
    main: function() {
        var _id = this.getId();
        return {
            model: this.get(_id),
        }
    },
    register: function() {
        var _id = this.getId();
        return {
            model: this.get(_id),
        }
    },
    login: function() {
        var _id = this.getId();
        return {
            model: this.get(_id),
        }
    },
    header: function() {
        var _id = this.getId();
        return {
            model: this.get(_id),
        }
    },
    footer: function() {
        var _id = this.getId();
        return {
            model: this.get(_id),
        }
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            logoLarge: t.find('#logoLarge').value,
            logoMini: t.find('#logoMini').value,
            skin: t.find('#skin').value,
            fixed: t.find('#fixed').value == "true" ? true : false,
            sidebarMini: t.find('#sidebarMini').value == "true" ? true : false,
            footerText: t.find('#footerText').value,
        };
    },
    /* action inserting data */
    put: function(t) {
        //set inserted doc
        var doc = this._getDoc(t);
        var _id = this.getId();

        Meteoris.ThemeAdmin.update(_id, {$set: doc}, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            Meteoris.Flash.set('success', "Successfully Updating Data");
        });
    },
    /* action get single data */
    get: function(_id) {
        return Meteoris.ThemeAdmin.findOne(_id);
    },
//    _getMenuDoc: function(t) {
//        return {
//            title: t.find('#title').value,
//            url: t.find('#url').value,
//            icon: t.find('#icon').value,
//        };
//    },
//    pushToMenus: function(t) {
//        var _id = this.getId();
//
//        Meteoris.ThemeAdmin.update(_id, {
//            $addToSet: {
//                menus: this._getMenuDoc(t)
//            }
//        }, function(err) {
//            if (err) {
//                Meteoris.Flash.set('danger', err.message);
//                throw new Meteor.Error(err);
//            }
//            Meteoris.Flash.set('success', "Successfully Adding Menu");
//
//            //reset form
//            $('#menuForm')[0].reset();
//
//            //close modal
//            $('#meteoris_themeAdminSettingForm').modal('hide');
//        });
//    },
//    settingMenu: function() {
//        var model = {};
//        console.log(this.getMenuId())
//        if (this.getMenuId() != "")
//            model = Meteoris.ThemeAdmin.findOne({"menus._id": Session.get('menuId')}, {_id: 0, 'menus.$': 1}).menus[0];
//
//        return {
//            model: model
//        };
//    },
//    setMenuId: function(menuId) {
////        this._menuId = menuId;
////        this.deps.changed();
//        Session.set('menuId', menuId)
//    },
//    getMenuId: function() {
////        this.deps.depend();
////        return this._menuId;
//        return Session.get('menuId')
//    }
});