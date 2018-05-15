# DevConnector

#### TODO: Fix comment links when clicking on an avatar
  - currently links to name of the poster and not the correct profile of the user, in the course it just links to "profile.html".

#### TODO: Fix input on websites  & github websites
  - if you input things incorrectly it may not work correctly.
  - putting an incorrect github link can cause errors (?)

#
##### Live website at: https://devconnector-spduk.herokuapp.com/dashboard
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

