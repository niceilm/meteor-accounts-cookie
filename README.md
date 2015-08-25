cookie base account
```
if(Meteor.isServer) {
    ServiceConfiguration.configurations.upsert(
        {service: "cookie"},
        {
            "service": "cookie",
            "secret": "some secret key",
            "cookieKey": "_cookie_key",
            "validationUrl": "https://sso.domain.com/validation",
            "loginUrl": "https://sso.domain.com/login?returnUrl=" + Meteor.absoluteUrl(),
            "logoutUrl": "https://sso.domain.com/logout?returnUrl=" + Meteor.absoluteUrl()
        }
    );
}
```