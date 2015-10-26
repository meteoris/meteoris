Package.describe({
    name: 'meteoris:flash',
    version: '0.0.3',
    summary: 'Meteoris package for displaying flash message easily.',
    git: 'https://github.com/meteoris/meteoris/tree/master/packages/meteoris:flash',
    documentation: 'README.md'
});

Package.onUse(function(api) {

    api.versionsFrom('1.2.0.2');        

    api.use([
        'twbs:bootstrap@3.0.0',
        'templating',
        'deps',        
        'zephraph:namespace@1.0.0',
    ], 'client');  
    
    api.imply([
        'twbs:bootstrap@3.0.0',
    ], 'client');  

    api.addFiles([
        'flash.css',
        'flash.html',
        'flash.js',
    ], 'client');

    api.export([
        'Flash',
    ], 'client');    

});