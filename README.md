cookie base account

**settings.json**
```
{
  "cookie": {
    "secret": "secret key",
    "validationUrl": "https://sso.domain.com/cookie_validation"
  },
  "public": {
    "cookie": {
      "key": "cookie_key",
      "loginUrl": "https://sso.domain.com/login?return_url=",
      "logoutUrl": "https://sso.domain.com/logout?return_url="
    }
  }
}
```