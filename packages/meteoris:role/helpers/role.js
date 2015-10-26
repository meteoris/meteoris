/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Namespace('Meteoris.Role');

Meteoris.Role = {
    GET_ALL: "GET_ALL",
    GET_ONE: "GET_ONE",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    userIsInRolePromise: function(collection, action) {
        Meteor.call("Meteoris.Role.userIsInRole", collection, action, function(err, result) {
            if (err) {
                return false;
                throw new Meteor.Error(err);
            } else {
                Session.set("isAuth" + collection + action, result);
            }
        });

        var promise = new Promise(function(resolve, reject) {
            Meteor.setTimeout(function() {
                resolve(Session.get("isAuth" + collection + action));
            }, 500);
        });
                
        return promise;
    },
    userIsInRole: function(collection, action) {
        Meteor.call("Meteoris.Role.userIsInRole", collection, action, function(err, result) {
            if (err) {
                return false;
                throw new Meteor.Error(err);
            } else {
                Session.set("isAuth" + collection + action, result);
            }
        });

        return Session.get("isAuth" + collection + action);
    },
    userIsInGroup: function(group) {
        var user = Meteor.user();

        if (user) {
            if (user.profile.group === group)
                return true;
        }

        return false;
    },
    _getRole: function(collection, action, callback) {
        Meteor.call("Meteoris.Role.userIsInRole", collection, action, function(err, result) {
            if (err) {
                return false;
                throw new Meteor.Error(err);
            } else {
                // console.log(result)
                callback(result);
            }
        });
    }
};

