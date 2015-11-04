Namespace('Meteoris.User');

Meteoris.User = {
    isExist: function() {
        Meteor.call('Meteoris.User.isExist', function(err, res) {
            if (err) {
                return false;
                throw new Meteor.Error(err);
            }
        });
        return ServerSession.get('Meteoris.User.isExist');
    }
};