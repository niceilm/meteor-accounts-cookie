var config = Meteor.settings.public.cookie;
if(!config) {
  throw new Meteor.Error("add public cookie property in settings.json");
}
Meteor.startup(onStartup);

Meteor.loginWithCookie = function(returnPath) {
  check(returnPath, Match.Optional(String));
  if(!Meteor.user()) {
    window.location = config.loginUrl + Meteor.absoluteUrl(returnPath || "");
  }
};

Meteor.logoutWithCookie = function(returnPath) {
  check(returnPath, Match.Optional(String));
  window.location = config.logoutUrl + Meteor.absoluteUrl(returnPath || "");
};

function onStartup() {
  if(!Meteor.settings.public) {
    throw Error('add public property in settings.json');
  }
  var authCookie = Cookie.get(config.key);
  if(!authCookie) {
    return;
  }

  var type = "cookie";
  var methodName = "login";
  var methodArguments = [{cookie: authCookie}];
  Accounts.callLoginMethod({
    methodArguments: methodArguments,
    userCallback: function(err) {
      Accounts._pageLoadLogin({
        type: type,
        allowed: !err,
        error: err,
        methodName: methodName,
        methodArguments: methodArguments
      });
    }
  });
}