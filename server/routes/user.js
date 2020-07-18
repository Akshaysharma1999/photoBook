const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const requireLogin = require("../middleware/requireLogin");

route.get("/user/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {      
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user: user, posts: posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User Not Found" });
    });
});

module.exports = route;
