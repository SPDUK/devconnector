const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const router = express.Router();
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');
// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Check the User collection in db
  // if the email from req.body matches an email in db
  // return json saying email already exists and stop.
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(req.body.email, {
      s: 200, // Size
      r: 'pg', // Rating
      d: 'mm' // Default Image
    });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          // creating a new variable from the save() and naming it newSavedUser
          // returning newSavedUser as json
          // same as newUser, but what the db returns not the input, no difference
          // in this case but maybe different in others
          .then(newSavedUser => res.json(newSavedUser))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route POST api/users/login
// @desc Login User / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  // the return of validateLoginInput(req.body) is destructured to 2 objects
  const { errors, isValid } = validateLoginInput(req.body);
  // if the result of passing req.body into validateLoginInput returns false
  // (meaning there are errors inside the error object being returned)
  // show the errors in json -- "email" : "Email is invalid" and stop
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // set email and password constants to the user inputs
  const email = req.body.email;
  const password = req.body.password;

  // check mongoDB to find a user with this email
  User.findOne({ email }).then(user => {
    // if there is no user matching the email searched show the errors and add a new field 'email'
    if (!user) {
      errors.email = 'Incorrect user/password combination';
      errors.password = 'Incorrect user/password combination';
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token - Expires after 24hrs
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 84000 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        errors.password = 'Incorrect user/password combination';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc Return current User
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
