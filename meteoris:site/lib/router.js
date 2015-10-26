/**
create the main router called site, and use BlazeLayout render "meteoris_themeAdminMain" from metoris:theme-admin package, and accessing template called "radiegtya_siteIndex"
*/
FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_siteIndex"});
    },   
});