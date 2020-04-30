const express = require("express");
const Admin = require("../../models/Admin");
const gravatar = require("gravatar");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

router.get("/admin/test", (req, res) => {
  res.json({ msg: "Admin are working" });
});

router.post("/dashboard/register-admin",
passport.authenticate("jwt", { session: false }),
 (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({
    email: req.body.email,
  }).then(admin => {
    if (admin) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
    Admin.findOne({
      username: req.body.username  
    }).then(admin => {
        if (admin) {
            errors.username = "Username already exists";
            return res.status(400).json(errors)
        } 
    });
      const newAdmin = new Admin({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(admin => res.json(admin))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/admin/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.admin.id,
      name: req.admin.name,
      username: req.admin.username,
      email: req.admin.email
    });
  }
);

module.exports = router;
