var ctrl = new Meteoris.UserController();

Template.meteoris_userIndex.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('meteoris_user', ctrl.getCriteria(), ctrl.getSortLimit());
    });
});

Template.meteoris_userIndex.helpers({
    isEmpty: function() {
        return ctrl.index().isEmpty;
    },
    models: function() {
        return ctrl.index().models;
    },
    hasMore: function() {
        return ctrl.index().hasMore;
    }
});

Template.meteoris_userIndex.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?"))
            ctrl.delete(this._id);
    },
    /* sorting by parameter */
    'click #btnSortEmail': function(e) {
        Meteoris.GridView.sort('emails.address');
    },
    /* sorting by parameter */
    'click #btnSortName': function(e) {
        Meteoris.GridView.sort('profile.name');
    },
    'keyup #search': function(e, t) {
        e.preventDefault();
        ctrl.search(t);
    },
    /* check all checkbox */
    'change #checkAll': function(e) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = e.target.checked;
        }
    },
    /* remove all selected item */
    'click #btnRemoveAll': function(e) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        var checkedLength = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedLength++;
            }
        }

        if (checkedLength > 0) {
            if (confirm("Are you sure want to remove? (total " + checkedLength + " data will be removed)")) {
                // loop over them all
                for (var i = 0; i < checkboxes.length; i++) {
                    // And stick the checked ones onto an array...
                    if (checkboxes[i].checked) {
                        ctrl.delete($(checkboxes[i]).val());
                    }
                }
            }
        } else {
            Meteoris.Flash.set('danger', 'Please Select Some data which You Want to Remove');
        }

        //set checkAll header to uncheck
        $('#checkAll').attr("checked", false);
    },
    'click #btnLogout': function(e, t) {
        e.preventDefault();
        ctrl.logout();
    }
};