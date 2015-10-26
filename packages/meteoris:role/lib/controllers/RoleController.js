Namespace('Meteoris.RoleController');

Meteoris.RoleController = Meteoris.Controller.extend({
    REDIRECT_LOGIN_PATH: "sitesIndex",
    ADMIN_GROUP: "admin",
    DEFAULT_GROUP: "guest",
    DEFAULT_ACTIONS: {
        index: "GET_ALL",
        view: "GET_ONE",
        insert: "POST",
        update: "PUT",
        remove: "DELETE"
    },
    /* passing data to index helpers template */
    index: function() {
        var groups = this.getAllGroup();
        var collections = this.getAllCollection();
        return {
            groups: groups,
            collections: collections
        };
    },
    /* action getAll data */
    // /* get sortLimit for limit & sorting collection */
    // getSortLimit: function() {
    //     var sort = Meteoris.GridView.getSorting();
    //     sort.limit = this.limit();
    //     return sort;
    // },
    // /* get criteria for searching collection */
    // getCriteria: function() {
    //     var search = FlowRouter.getQueryParam('search') ? FlowRouter.getQueryParam('search') : "";
    //     var criteria = {};
    //     if (search) {
    //         criteria = {
    //             $or: [
    //                 {name: {$regex: search, $options: 'i'}},
    //                 {description: {$regex: search, $options: 'i'}},
    //             ]
    //         }
    //     }
    //     return criteria;
    // },
    // /* action searching data by user input with parameter */
    // search: function(t) {
    //     FlowRouter.go('/mom/account-class', {}, {limit: this.limit(), search: t.find('#search').value});
    // },
    // /* passing data to view helpers template */
    // view: function() {
    //     var _id = this.getId();
    //     return {
    //         model: this.get(_id)
    //     }
    // },
    // /* action inserting data */
    // post: function(t) {
    //     var doc = this._getDoc(t);

    //     Mom.AccountClass.insert(doc, function(err, _id) {
    //         if (err) {
    //             Meteoris.Flash.set('danger', err.message);
    //             throw new Meteor.Error(err);
    //         }
    //         Meteoris.Flash.set('success', "Successfully Inserting Data");
    //         FlowRouter.go('/mom/account-class/' + _id);
    //     });
    // },
    // /* private get user input docs */
    // _getDoc: function(t) {
    //     return {
    //         name: t.find('#name').value,
    //         accountingReportType: t.find('#accountingReportType').value,
    //         description: t.find('#description').value,
    //     };
    // },
    // /* passing data to update helpers template */
    // update: function() {
    //     var _id = this.getId();
    //     return {
    //         model: this.get(_id),
    //     }
    // },
    // /* action inserting data */
    // put: function(t) {
    //     //set inserted doc
    //     var doc = this._getDoc(t);
    //     var _id = this.getId();

    //     Mom.AccountClass.update(_id, {$set: doc}, function(err) {
    //         if (err) {
    //             Meteoris.Flash.set('danger', err.message);
    //             throw new Meteor.Error(err);
    //         }
    //         Meteoris.Flash.set('success', "Successfully Updating Data");
    //         FlowRouter.go('/mom/account-class/' + _id);
    //     });
    // },
    // /* action get single data */
    // get: function(_id) {
    //     return Mom.AccountClass.findOne(_id);
    // },
    // /* action removing data by id */
    // delete: function(_id) {
    //     Mom.AccountClass.remove(_id, function(err) {
    //         if (err) {
    //             Meteoris.Flash.set('danger', err.message);
    //             throw new Meteor.Error(err);
    //         }
    //         Meteoris.Flash.set('success', "Successfully Deleting Data");
    //     });
    // },
    /**
     * ================== 
     * Roles Group
     * ==================
     */
    getGroup: function() {
      return this.router.getParam('group') ? this.router.getParam('group') : null;  
    },
    getAllGroup: function() {
        return Meteoris.RoleGroup.find({}, {sort: {name: -1}});
    },
    /**
     * Inserting Group to collection
     * @return {[type]}   [description]
     */
    insertGroup: function(t) {
        var doc = this._getDocGroup(t);

        //check group name duplicate or not
        this._checkGroupNameDuplicate(doc.name);

        Meteoris.RoleGroup.insert(doc, function(error, result) {
            if (error) {
                throw new Meteor.Error(error.message);
                Meteoris.Flash.set("danger", error.message);
            } else {
                Meteoris.Flash.set('success', "Success Inserting Group");
                $('#meteoris_roleFormGroupModal').modal("hide");
            }
        });
    },
    deleteGroup: function(_id) {
        Meteoris.RoleGroup.remove(_id, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            Meteoris.Flash.set('success', "Success Removing Group");
        });
    },
    /**
     * Get doc (values) from form Group
     * @return {[type]}   [description]
     */
    _getDocGroup: function(t) {
        return {
            name: (t.find('#groupName').value).toLowerCase(),
            description: t.find('#groupDescription').value
        };
    },
    /**
     * Check If name already exist in group, validate error
     * @return {[type]}      [description]
     */
    _checkGroupNameDuplicate: function(name) {
        var checkName = Meteoris.RoleGroup.findOne({
            name: name
        });

        if (checkName) {
            Meteoris.Flash.set('danger', "Group Name already exist");
            throw new Meteor.Error("Group Name already exist");
        }
    },
    /**
     * ====================== 
     * Eof Roles Group
     * ======================
     */
    /**
     * ======================
     * Roles Collection
     * ======================
     */
    getAllCollection: function() {
        return Meteoris.RoleCollection.find({}, {sort: {name: -1}});
    },
    /**
     * Insert Collection to collection
     * @return {[type]}   [description]
     */
    insertCollection: function(t) {
        var doc = this._getDocCollection(t);

        //check collection name duplicate or not
        var check = this._checkCollectionNameDuplicate(doc.name);

        Meteoris.RoleCollection.insert(doc, function(error, result) {
            if (error) {
                throw new Meteor.Error(error.message);
                Meteoris.Flash.set("danger", error.message);
            } else {
                Meteoris.Flash.set('success', "Success Inserting Roles Collection");

                //reset form and hide modal
                $('#meteoris_roleFormCollectionModal').modal("hide");
                $('#collectionName').val("");
            }
        });
    },
    deleteCollection: function(_id, name) {
        
        this._checkCollectionExistInGroup(name);
        
        Meteoris.RoleCollection.remove(_id, function(err) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            Meteoris.Flash.set('success', "Success Removing Collection");
        });
    },
    /**
     * Get doc (values) from form collection
     * @return {[type]}   [description]
     */
    _getDocCollection: function(t) {
        var actions = this._getStandardActions();
        return {
            name: (t.find('#collectionName').value),
            actions: actions
        };
    },
    /**
     * Get Standard actions to set default collection actions
     * @return {[type]} [description]
     */
    _getStandardActions: function() {
        return [{
                name: "GET_ALL"
            }, {
                name: "GET_ONE"
            }, {
                name: "POST"
            }, {
                name: "PUT"
            }, {
                name: "DELETE"
            }];
    },
    /**
     * Update Collection to set actions
     * @return {[type]}   [description]
     */
    insertCollectionAction: function(collectionId, name) {

        var doc = {
            name: name.toUpperCase()
        };

        //check action name duplicate or not
        this._checkCollectionActionNameDuplicate(collectionId, doc.name);

        Meteoris.RoleCollection.update(collectionId, {
            $addToSet: {
                actions: doc
            }
        }, function(err, result) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            Meteoris.Flash.set('success', "Success Inserting Role Collection");
        });
    },
    /**
     * Remove Collection Action
     * @return {[type]}                [description]
     */
    deleteCollectionAction: function(collectionId, collectionName, actionName) {

        this._checkRoleExistInGroup(collectionName, actionName);

        Meteoris.RoleCollection.update(collectionId, {
            $pull: {
                actions: {
                    name: actionName
                }
            }
        }, function(err, result) {
            if (err) {
                Meteoris.Flash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            Meteoris.Flash.set('success', "Success Removing Collection Action");
        });
    },
    /**
     * Check If name already exist in collection, validate error
     * @return {[type]}      [description]
     */
    _checkCollectionNameDuplicate: function(name) {
        var checkName = Meteoris.RoleCollection.findOne({
            name: name
        });

        if (checkName) {
            Meteoris.Flash.set('danger', "Collection Name already exist");
            throw new Meteor.Error("Collection Name already exist");
        }
    },
    /**
     * Check If name already exist in collection actions, validate error
     * @return {[type]}      [description]
     */
    _checkCollectionActionNameDuplicate: function(collectionId, name) {
        var checkActionName = Meteoris.RoleCollection.findOne({
            _id: collectionId,
            actions: {
                $elemMatch: {
                    name: name
                }
            }
        });

        if (checkActionName) {
            Meteoris.Flash.set('danger', "Collection Action Name already exist");
            throw new Meteor.Error("Collection Action Name already exist");
        }
    },
    _checkCollectionExistInGroup: function(collectionName) {
        var collections = Meteoris.RoleGroup.find({
            roles: {
                $elemMatch: {
                    collectionName: collectionName,    
                }
            }
        });
        var error = "Collection already in use groups, You couldn't remove this collection";
        if (collections.count() > 0) {
            Meteoris.Flash.set('danger', error);
            throw new Meteor.Error(error);
        }
    },
    _checkRoleExistInGroup: function(collectionName, actionName) {
        var roles = Meteoris.RoleGroup.find({
            roles: {
                $elemMatch: {
                    collectionName: collectionName,
                    actionName: actionName
                }
            }
        });
        var error = "Collection Action Name already in use groups, You couldn't remove this action";
        if (roles.count() > 0) {
            Meteoris.Flash.set('danger', error);
            throw new Meteor.Error(error);
        }
    },
    /**
     * ===================== 
     * End Role Collection
     * =====================
     */
});