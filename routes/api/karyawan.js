const express = require("express");
const Karyawan = require("../../models/Karyawan");
const gravatar = require("gravatar");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

router.get("/test", (req, res) => {
  res.json({ msg: "Users are working" });
});

router.post("/register-karyawan",
passport.authenticate("jwt", { session: true }),
(req, res) => {
  const { errors, isValid } = validateRegisterKaryawanInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Karyawan.findOne({
    karyawan_email: req.body.karyawan_email
  }).then(karyawan => {
    if (karyawan) {
      errors.karyawan_email = "Email Karyawan already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.karyawan_email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newKaryawan = new Karyawan({
        first_name_karyawan: req.body.fist_name,
        last_name_karyawan: req.body.last_name,
        alamat_karyawan: req.body.alamat,
        phone_number: req.body.phone_number,
        karyawan_username: req.body.username
        karyawan_email: req.body.email,
        avatar,
        karyawan_password: req.body.password
      });

      bcrypt.genSalt(20, (err, salt) => {
        bcrypt.hash(newKaryawan.karyawan_password, salt, (err, hash) => {
          if (err) throw err;
          newKaryawan.karyawan_password = hash;
          newKaryawan
            .save()
            .then(karyawan => res.json(karyawan))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/loginkaryawan", (req, res) => {
  const { errors, isValid } = validateLoginKaryawanInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const karyawan_email = req.body.karyawan_email;
  const karyawan_password = req.body.karyawan_password;

  Karyawan.findOne({ karyawan_email }).then(karyawan=> {
    if (!karyawan) {
      errors.karyawan_email = "Karyawan not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(karyawan_password, karyawan.karyawan_password).then(isMatch => {
      if (isMatch) {
        const payloadkaryawan = {
          id: karyawan.id,
          name: karyawan.karyawan_name,
          avatar: karyawan.karyawan_avatar
        };
        jwt.sign(
          payloadkaryawan,
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
        errors.password = "Karyawan Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current-karyawan",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.karyawan.id,
      name: req.karyawan.karyawan_name,
      email: req.karyawan.karyawan_email
    });
  }
);

module.exports = router;
