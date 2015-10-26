Meteor.publishComposite('meteoris_roleCollection', function(doc, sort) {
    console.log("subscribing some Role Collections");
    return {
        find: function() {
            return Meteoris.RoleCollection.find(doc, sort);
        },
        children: [

        ],
    }
});