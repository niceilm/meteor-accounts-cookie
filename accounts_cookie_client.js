var config = null;

Meteor.startup(function() {
  config = ServiceConfiguration.configurations.findOne({service: 'cookie'});
  console.log(config);
  if(!config) {
    throw new ServiceConfiguration.ConfigError();
  }

  var authCookie = Cookie.get(config.cookieKey);
  if(!authCookie) {
    return;
  }

  var methodArguments = [{cookie: authCookie}];
  Accounts.callLoginMethod({
    methodArguments: methodArguments,
    userCallback: function(err) {
      Accounts._pageLoadLogin({
        type: "cookie",
        allowed: !err,
        error: err,
        methodName: 'login',
        methodArguments: methodArguments
      })
    }
  });
});

Meteor.loginWithCookie = function() {
  if(!Meteor.user()) {
    window.location = config.loginUrl;
  }
};

Meteor.logoutWithCookie = function() {
  window.location = config.logoutUrl;
};