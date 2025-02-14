const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const requireLogin = require("../middleware/requireLogin");

/**
 * Route to create a post
 */
route.post("/createpost", requireLogin, (req, res) => {
  const { title, body, photo } = req.body;
  if (!title || !body || !photo) {
    return res.status(422).json({ error: "Fields Missing" });
  }
  req.user.password = undefined;
  const post = new Post({
    title: title,
    body: body,
    photo: photo,
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
    .populate("postedBy", "_id name profileImage")
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      posts.reverse();
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
    .populate("postedBy", "_id name profileImage")
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      posts.reverse();
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * Route to like a post
 */
route.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    { new: true }
  )
    .populate("postedBy", "_id name profileImage")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

/**
 * Route to unlike a post
 */
route.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate("postedBy", "_id name profileImage")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

/**
 * Route to comment on a post
 */
route.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("postedBy", "_id name profileImage")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

/**
 * Route to delete a post
 */
route.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      if (!post) {
        return res.status(422).json({ error: "Post Not Found" });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json({ message: "Post Deleted Successfully" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
});

/**
 * Route to get posts of people i follow
 */
route.get("/getsubposts", requireLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name profileImage")
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      posts.reverse();
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = route;
