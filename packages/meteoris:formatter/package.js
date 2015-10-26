Package.describe({
    name: 'meteoris:formatter',
    version: '0.0.2',
    summary: 'Meteoris package for formatting anything.',
    git: 'https://github.com/meteoris/meteoris/tree/master/packages/meteoris:formatter',
    documentation: 'README.md'
});

Package.onUse(function(api) {

    api.versionsFrom('1.2.0.2');

    api.use([
        'momentjs:moment@2.0.0',  
        'lepozepo:accounting@1.0.0',  
        'ui', 
        'zephraph:namespace@1.0.0',
    ], 'client');    

    api.addFiles([
        'formatter.js',
    ], 'client');

    api.export([
        'Formatter',
    ], 'client');    

});