# DevConnector

Might take a while to wake up because it is hosted on heroku and mlab which put things to sleep, but it does work I promise.

##### Live website at: https://devconnector-spduk.herokuapp.com/
##### Learned from : https://www.udemy.com/mern-stack-front-to-back/
---






##### /config/keys_dev.js needs:

```
module.exports = {
  mongoURI: 'mongoURIGoesHere',
  secretOrKey: 'secretOrKeyGoesHere'
};
```
##### /client/src/components/profile/ProfileGithub needs to be replaced with:
-- found in OAuth application settings on github, for the API call.
```
    clientId: clientIdGoesHere,
    clientSecret: clientSecretGoesHere,
```

