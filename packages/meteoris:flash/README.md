/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

@NEXTUPDATE "Please remove bootstrap dependency and simply use regular css"

how to use in your js file:
```
//set flash message example
Meteoris.Flash.set('success', 'Data Successfully added');
Meteoris.Flash.set('danger', 'Data Failed to be added');
```

how to use in your html file:

```
<!-- Simply place this code on your html view anywhere -->
{{> meteoris_flash}}
```