- this Meteoris.FormValidation extension depends on collection2 and simpleschema:

```
AccountType = new Mongo.Collection("accountType");

var schemas = new SimpleSchema({
    accountClassId: {
        type: String,
        label: "Kelas Akun",
    },    
});

AccountType.attachSchema(schemas);

```

- how to use in your js helper:

```
    /* show error message on view */
    error: function(field) {
        return Meteoris.FormValidation.error(YourCollectionName, field);
    },
```

- how to use in your html view:

```
        <div class="form-group {{#if error 'name'}}has-error{{/if}}">
            <label for="name" class="control-label">Kelas Akun *</label>
            <input type="text" id="name" value="{{name}}" placeholder="Kelas Akun" class="form-control" autofocus="true">
            <span class="help-block">{{error "name"}}</span>
        </div>

```