const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const requireLogin = require("../middleware/requireLogin");

/**
 * Get user profile
 */
route.get("/user/:id", requireLogin, (req, res) => {
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

/**
 * Follow a User
 */
route.put("/follow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.body.followId },
    {
      $push: { followers: req.user._id },
    },
    { new: true },
    (err, resultOn) => {
      // console.log(result)
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .then((result) => {
          result.password = undefined;
          resultOn.password = undefined;
          res.json({ from: result, to: resultOn });
        })
        .catch((error) => {
          return res.status(422).json({ error: error });
        });
    }
  );
});

/**
 * UnFollow a User
 */
route.put("/unfollow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.body.unFollowId },
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (err, resultOn) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.body.unFollowId },
        },
        { new: true }
      )
        .then((result) => {
          result.password = undefined;
          resultOn.password = undefined;
          res.json({ from: result, to: resultOn });
        })
        .catch((error) => {
          return res.status(422).json({ error: error });
        });
    }
  );
});

/**
 * Update user profileImage
 */
route.put("/updatepic", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: { profileImage: req.body.profileImage },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "Pic Connot Post" });
      }
      result.password = undefined;
      res.json(result);
    }
  );
});
module.exports = route;
