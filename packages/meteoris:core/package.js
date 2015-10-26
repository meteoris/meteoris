Package.describe({
    name: 'meteoris:core',
    version: '0.2.2',
    summary: 'Meteoris Core System.',
    git: 'https://github.com/meteoris/meteoris/tree/master/packages/meteoris:core',
    documentation: 'README.md'
});

Package.onUse(function(api) {

    api.versionsFrom('1.2.0.2');
    
    api.use([
        'jquery',
        'sacha:spin@2.0.0',     
    ], 'client');

    api.use([
        'deps',
        'kadira:flow-router@2.0.0',
        'zephraph:namespace@1.0.0',
        //
    ], ['client', 'server']);
    
    api.imply([
        'jquery',
        'meteoris:grid-view@0.0.0',
        'meteoris:flash@0.0.0',
        'meteoris:formatter@0.0.0',
        'meteoris:form-validation@0.0.0',
        'sacha:spin@2.0.0',     
    ], 'client');

    api.imply([
        'deps',
        'kadira:flow-router@2.0.0',
        'zephraph:namespace@1.0.0',
        //
        'kadira:blaze-layout@2.0.0',
        'aldeed:collection2@2.0.0',
        'aldeed:simple-schema@1.0.0',
        'dburles:collection-helpers@1.0.0',
        'reywood:publish-composite@1.0.0',
    ], ['client', 'server']);

    api.addFiles([
        'lib/Class.js',
        'lib/Controller.js',
    ], ['client', 'server']);

    api.export([
        'Controller',
    ], ['client', 'server']);

});