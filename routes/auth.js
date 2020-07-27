const express = require("express");
const nodemailer = require("nodemailer");
const route = express.Router();
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, GPASS, GMAIL } = require("../config/keys");

/**
 * Send Mail Setup
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GPASS,
  },
});

function mailHelper(subject, text, html, mailTo, res) {
  const mailOptions = {
    from: process.env.GMAIL,
    to: mailTo,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      if (res === null) {
        console.log(error);
      } else {
        return res.status(422).json({ error: "Error Sending Mail" });
      }
    }
    if (res === null) {
      console.log(info);
    } else {
      res.json({ message: "Mail Sent 📧" });
    }
  });
}

/**
 * Route to send Reset Mail Link
 */
route.post("/resetMailLink", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");

    User.findOne({ email: req.body.mailTo }).then((user) => {
      if (!user) {
        return res.status(422).json({ error: "User Does Not Exist" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        mailHelper(
          "Password Reset",
          "Password Reset Link",
          `<p>Click to reset password <a href="http://localhost:3000/resetPassword/${token}">here</a><p/>`,
          req.body.mailTo,
          res
        );
      });
    });
  });
});

/**
 * Route for creating user
 */
route.post("/signup", (req, res) => {
  const { name, email, password, profileImage } = req.body;
  if (!email || !name || !password || !profileImage) {
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
            profileImage: profileImage,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "Saved successfully" });
              mailHelper(
                "Welcome To photoBook",
                "Happy you have joined us",
                "<p>Enjoy Awesom Features <a href=`http://localhost:3000/`>here</a><p/>",
                req.body.email,
                null
              );
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
            _id: savedUser._id,
            followers: savedUser.followers,
            following: savedUser.following,
            profileImage: savedUser.profileImage,
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

/**
 * Route to reset password
 */

route.post("/newPass", (req, res) => {
  const newPassword = req.body.password;
  const recToken = req.body.token;
  User.findOne({ resetToken: recToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Link Expired" });
      }
      bcrypt.hash(newPassword, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((savedUser) => {
          res.json({ message: "Password Updated Successfully" });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = route;
