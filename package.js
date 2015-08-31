Package.describe({
  name: 'flynn:accounts-cookie',
  version: '0.0.16',
  // Brief, one-line summary of the package.
  summary: 'A user account for cookie base',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/niceilm/meteor-accounts-cookie.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('http', 'server');
  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);
  api.use('service-configuration', ['client', 'server']);
  api.imply('service-configuration', ['client', 'server']);
  api.use('chuangbo:cookie@1.1.0', 'client');

  api.addFiles('accounts_cookie_server.js', "server");
  api.addFiles('accounts_cookie_client.js', "client");
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('flynn:accounts-cookie');
  api.use('test-helpers');
  api.addFiles('accounts_cookie_server_tests.js', 'server');
  api.addFiles('accounts_cookie_client_tests.js', 'client');
});
