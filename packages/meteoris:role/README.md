/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

## How to use

1. Check whether current logged in user is in role or not in Collection/Server:

```
//you can use this code on collection-allow or on server
Meteoris.Role.userIsInRole(collection, action);

//example on collection:
MyCollection.allow({
    insert: function(userId, doc) {
        return Meteoris.Role.userIsInRole("my-collection", Meteoris.Role.POST);
    },
    update: function(userId, doc) {
        return Meteoris.Role.userIsInRole("my-collection", Meteoris.Role.PUT);
    },
    remove: function(userId, doc) {
        return Meteoris.Role.userIsInRole("my-collection", Meteoris.Role.DELETE);
    },
});

//example on router
var roleRoutes = FlowRouter.group({
    prefix: '/meteoris/role',
    name: 'meteoris_role',
    triggersEnter: [authenticating]
});

/* router level validation, only allow user with group "admin" to access this page */
function authenticating() {    
    if (!Meteoris.Role.userIsInRole("my-collection", Meteoris.Role.GET_ALL)){
        Meteoris.Flash.set("danger", "403 Unauthenticated");
        FlowRouter.go("/");
    }
}

```

2. Check whether current logged in user is in group or not in Collection/Server:

```
//you can use this code on collection-allow or on server
Meteoris.Role.userIsInGroup(groupName);

//example on collection:
MyCollection.allow({
    insert: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
    update: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
    remove: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
});

var roleRoutes = FlowRouter.group({
    prefix: '/meteoris/role',
    name: 'meteoris_role',
    triggersEnter: [authenticating]
});

/* router level validation, only allow user with group "admin" to access this page */
function authenticating() {    
    if (!Meteoris.Role.userIsInGroup("user")){
        Meteoris.Flash.set("danger", "403 Unauthenticated");
        FlowRouter.go("/");
    }
}

```

3. Check whether current logged in user is in role or not in Client template:

```
//you can use this code on client template html
{{#if meteoris_roleUserIsInRole "collectionName" "actionName"}}
<!-- Your logic here -->
{{/if}}

//example on client template html:
{{#if meteoris_roleUserIsInRole "my-collection" "GET_ALL"}}
<li><a href="/my-collection"><i class="fa fa-flag-o"></i> My Collection Menu</a></li>
{{/if}}

4. Check whether current logged in user is in group or not in Client template:

```
//you can use this code on client template html
{{#if meteoris_roleUserIsInGroup "groupName"}}
<!-- Your logic here -->
{{/if}}

//example on client template html:
{{#if meteoris_roleUserIsInGroup "admin"}}
<li><a href="/my-collection"><i class="fa fa-flag-o"></i> My Collection Menu</a></li>
{{/if}}

```

