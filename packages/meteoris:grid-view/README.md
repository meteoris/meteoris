- this Meteoris.GridView extension used for sorting your table header ascending or descending.
- how to use in your html view:
```
<th id="btnSortName" class="{{meteoris_gridViewSortClass 'name'}}">Name</th>
```
- how to use in your js events:
```
    Template.accountTypeIndex.events = {
        /* sorting by parameter */
        'click #btnSortName': function(e) {
            Meteoris.GridView.sort('name');
        },
    }
```