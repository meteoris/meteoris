Package.describe({
    name: 'meteoris:user',
    version: '0.0.8',
    // Brief, one-line summary of the package.
    summary: 'Meteoris package for manage meteor users',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/meteoris/meteoris/tree/master/packages/meteoris:user',
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
        'service-configuration',
        'reactive-var',
        'accounts-facebook',
        'kadira:flow-router@2.0.0',
        'kadira:blaze-layout@2.0.0',
        'zephraph:namespace@1.0.0',
        'aldeed:collection2@2.0.0',
        'aldeed:simple-schema@1.0.0',
        'dburles:collection-helpers@1.0.0',
        'reywood:publish-composite@1.0.0',
        'matteodem:server-session@0.4.2'
    ], ['client', 'server']);

    api.addFiles([
        'lib/collections/User.js',
        'lib/controllers/UserController.js',
        'lib/router.js',
        'helpers/user.js'
    ], ['client', 'server']);

    api.addFiles([
        'server/UserServer.js'
    ], 'server');

    api.addFiles([
        'client/views/index.html',
        'client/views/index.js',
        'client/views/view.html',
        'client/views/view.js',
        'client/views/insert.html',
        'client/views/insert.js',
        'client/views/_form.html',
        'client/views/_form.js',
        'client/views/update.html',
        'client/views/update.js',
        'client/views/login.html',
        'client/views/login.js',
        'client/views/register.html',
        'client/views/register.js',
        'client/views/profile.html',
        'client/views/profile.js',
        'client/views/forget-password.html',
        'client/views/forget-password.js',
        'client/views/settings.html',
        'client/views/settings.js',
    ], 'client');


    api.export([
        'UserController',
    ], 'client');

//    api.export([
//        'AccountClass',
//    ], ['client', 'server']);
});
