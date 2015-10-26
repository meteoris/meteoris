Package.describe({
    name: 'meteoris:role',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Meteoris package for ACL',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.2');

    api.use([
        'ecmascript',
        'templating',
        'jquery',
        'reactive-var',
        'meteoris:core@0.0.0',
        'meteoris:grid-view@0.0.0',
        'meteoris:flash@0.0.0',
        'meteoris:formatter@0.0.0',
        'meteoris:form-validation@0.0.0',
        'meteoris:theme-admin@0.0.0',
        'sacha:spin@2.0.0',
    ], 'client');

    api.use([
        'mongo',
        'accounts-base',
        'accounts-password',
        'kadira:flow-router@2.0.0',
        'kadira:blaze-layout@2.0.0',
        'zephraph:namespace@1.0.0',
        'aldeed:collection2@2.0.0',
        'aldeed:simple-schema@1.0.0',
        'dburles:collection-helpers@1.0.0',
        'reywood:publish-composite@1.0.0',        
    ], ['client', 'server']);

    api.addFiles([
        'helpers/role.js',
        'lib/collections/RoleCollection.js',
        'lib/collections/RoleGroup.js',
        'lib/controllers/RoleController.js',
        'lib/router.js',        
    ], ['client', 'server']);

    api.addFiles([
        'server/RoleCollectionServer.js',
        'server/RoleGroupServer.js',
    ], 'server');

    api.addFiles([
        'client/views/index.html',
        'client/views/index.js',
        'client/views/_formCollection.html',
        'client/views/_formCollection.js',
        'client/views/_formGroup.html',
        'client/views/_formGroup.js',
        'client/views/assignUsers.html',
        'client/views/assignUsers.js',
        'helpers/role-ui.js'
    ], 'client');

    api.export([        
        'RoleController',
    ], 'client');

    api.export([
        'Role',
        'RoleGroup',
        'RoleCollection',
    ], ['client', 'server']);

});