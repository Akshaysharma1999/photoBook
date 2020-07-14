const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const requireLogin = require("../middleware/requireLogin");

/**
 * Route to create a post
 */
route.post("/createpost", requireLogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "Fields Missing" });
  }
  req.user.password = undefined;
  const post = new Post({
    title: title,
    body: body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * Route to get all posts
 */
route.get("/allposts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * Route to get all posts by a user
 */
route.get("/myallposts", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = route;
