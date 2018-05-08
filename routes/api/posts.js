const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();
// Post model
const Post = require('../../models/Post');

// Validation
const validatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Posts works' }));

module.exports = router;

// @route POST api/posts
// @desc create post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // run the user input through validatePostInput
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors send 400 status with the errors objects
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);
