Accounts.registerLoginHandler("cookie", function(options) {
  if(!options.cookie) {
    return undefined; // don't handle
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'cookie'});
  if(!config) {
    throw new ServiceConfiguration.ConfigError();
  }

  check(options, {cookie: String});
  var response = {};
  try {
    response = HTTP.post(config.validationUrl, {
      data: {
        access_key: config.secret.accessKey,
        cookie: options.cookie
      }
    });
  } catch(e) {
    console.log(e);
    throw new Meteor.Error(403, JSON.stringify(e));
  }
  var ldapId = response.data.userid;
  response.data.id = ldapId;
  return Accounts.updateOrCreateUserFromExternalService("cookie", response.data, {profile: {name: ldapId}});
});
Meteor.users._ensureIndex('services.cookie.id', {unique: 1, sparse: 1});