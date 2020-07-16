const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

/**
 * Route for creating user
 */
route.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({ error: "Add all fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exists" });
      } else {
        bcrypt.hash(password, 10).then((hashedPassword) => {
          const user = new User({
            email: email,
            name: name,
            password: hashedPassword,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "Saved successfully" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * Route for login
 */
route.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Fields Missing" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or Password" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((isMatched) => {
        if (isMatched) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          res.json({
            token: token,
            message: "Successfully Signed In ",
            name: savedUser.name,
            email: savedUser.email,
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or Password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = route;
