Meteor.startup(onStartup);

Meteor.loginWithCookie = function() {
  if(!Meteor.user()) {
    var config = ServiceConfiguration.configurations.findOne({service: 'cookie'});
    if(!config) {
      throw new ServiceConfiguration.ConfigError();
    }

    window.location = config.loginUrl;
  }
};

Meteor.logoutWithCookie = function() {
  var config = ServiceConfiguration.configurations.findOne({service: 'cookie'});
  if(!config) {
    throw new ServiceConfiguration.ConfigError();
  }
  window.location = config.logoutUrl;
};

function onStartup() {
  if(!Meteor.settings.public) {
    throw Error('add public property in settings.json');
  }
  var cookieKey = Meteor.settings.public.cookieKey;
  var authCookie = Cookie.get(cookieKey);
  if(!authCookie) {
    return;
  }

  var methodArguments = [{cookie: authCookie}];
  Accounts.callLoginMethod({
    methodArguments: methodArguments,
    userCallback: function(err) {
      if(err) {
        console.log(err);
        Meteor.logout();
      } else if(!Meteor.user()) {
        Accounts._pageLoadLogin({
          type: "cookie",
          allowed: !err,
          error: err,
          methodName: 'login',
          methodArguments: methodArguments
        });
      }
    }
  });
}