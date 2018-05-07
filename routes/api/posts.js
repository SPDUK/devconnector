const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

const Post = require('../../models/Post');
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
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);
