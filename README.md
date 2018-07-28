# DevConnector



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

