Package.describe({
    name: 'meteoris:form-validation',
    version: '0.0.2',
    summary: 'Meteoris package for validating form for each fields using Simple Schema Dependency.',
    git: 'https://github.com/meteoris/meteoris/tree/master/packages/meteoris:form-validation',
    documentation: 'README.md'
});

Package.onUse(function(api) {

    api.versionsFrom('1.2.0.2');

    api.use([
        'ui',        
        'aldeed:collection2@2.0.0',
        'aldeed:simple-schema@1.0.0',
        'zephraph:namespace@1.0.0',
    ], 'client');    

    api.addFiles([
        'form-validation.js',
    ], 'client');

    api.export([
        'FormValidation',
    ], 'client');    

});