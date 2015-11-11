Package.describe({
    name: 'meteoris:backup-restore',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Meteoris package for dump and restore mongo',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/meteoris/meteoris/tree/master/packages/meteoris:backup-restore',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');

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
        'tomi:upload-jquery@2.1.8',
    ], 'client');

    api.use([
        'mongo',
        'kadira:flow-router@2.0.0',
        'kadira:blaze-layout@2.0.0',
        'zephraph:namespace@1.0.0',
        'aldeed:collection2@2.0.0',
        'aldeed:simple-schema@1.0.0',
        'dburles:collection-helpers@1.0.0',
        'reywood:publish-composite@1.0.0',
        'momentjs:moment@2.0.0',
        'tomi:upload-server@1.3.1',
    ], ['client', 'server']);


    api.addFiles([
        'lib/collections/BackupRestoreConfig.js',
        'lib/controllers/BackupRestoreController.js',
        'lib/config.js',
        'lib/router.js',
    ], ['client', 'server']);

    api.addFiles([
        'server/BackupRestoreServer.js',
    ], 'server');

    api.addFiles([
        'client/assets/upload.js',
        'client/views/index.html',
        'client/views/index.js',
        'client/views/_form.html',
        'client/views/_form.js',
    ], 'client');

    api.export([
        'Uploader',
    ], 'client');

    api.export([
        'BackupRestoreConfig',
        'UploadServer',
    ], ['client', 'server']);

});

