/**
 * Don't edit this if you don't know what exactly are you doing 
 */
UI.registerHelper('meteoris_role', function(option, firstParam, secondParam) {
    return Meteoris.Role[option](firstParam, secondParam);
});
UI.registerHelper('meteoris_roleUserIsInRole', function(collection, action) {
    Meteoris.Role.userIsInRole(collection, action).then(function(res){        
    });
    if(Session.get("isAuth" + collection + action))
        return Session.get("isAuth" + collection + action);
});
UI.registerHelper('meteoris_roleUserIsInGroup', function(group) {
    return Meteoris.Role.userIsInGroup(group);
});

