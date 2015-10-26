Package.describe({
    name: 'meteoris:grid-view',
    version: '0.0.2',
    summary: 'Meteoris package for Table sorter.',
    git: 'https://github.com/meteoris/meteoris/tree/master/packages/meteoris:grid-view',
    documentation: 'README.md'
});

Package.onUse(function(api) {

    api.versionsFrom('1.2.0.2');

    api.use([
        'deps',  
        'ui',  
        'zephraph:namespace@1.0.0',
    ], 'client');    

    api.addFiles([
        'grid-view.js',
        'grid-view.css',
    ], 'client');

    api.export([
        'GridView',
    ], 'client');    

});