/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

FlowRouter.route('/test', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "hello"});
    },
});


