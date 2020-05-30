// @ts-nocheck
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Reselller = require("../../models/Reseller");
const Admin = require("../../models/Admin");
const validateReseller = require("../../validations/reseller");

router.get("test/reseller", (req, res) => {
    res.json({msg1: "Reseller works"});
});
router.get("/reseller",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Reseller.find()
      .populate("reseller",
       ["reseller_code", 
        "reseller_name",
        "reseller_description",
        "category_reseller",
        "reseller_expired",
        "status",
      ])
      .then(reseller => {
        if (!reseller) {
          errors.noreseller = "Reseller Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(reseller);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.get("/show/category-reseller",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    CategoryReseller.find()
      .populate("category_reseller",
       ["category_reseller_code", 
        "category_reseller_name"
      ]
      .where('status').equals('1').
      .then(categoryreseller => {
        if (!categoryreseller) {
          errors.categoryreseller = "Category untuk reseller Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(categoryreseller);
      })
      .catch(err => res.status(404).json(err));
  }
);

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
router.post("/login-reseller", (req, res) => {
  const { errors, isValid } = validateLoginResellerInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const reseller_email = req.body.reseller_email;
  const reseller_password = req.body.reseller_password;

  Reseller.findOne({ reseller_email }).then( reseller => {
    if (!reseller) {
      errors.reseller_email = "Reseller not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(reseller_password, reseller.reseller_password).then(isMatch => {
      if (isMatch) {
        const payloadreselller = {
          id: reseller.id,
          name: reseller.reseller_name,
          avatar: reseller.reseller_avatar
        };
        jwt.sign(
          payloadreselller,
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
        errors.password = "Reseller Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current-reseller",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.reseller.id,
      name: req.reseller.reseller_name,
      email: req.reseller.reseller_email
    });
  }
);
router.get(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req,res) => {
    Reseller.findById(req.params.id)
    .then(reseller => res.json(resellers))
    .catch(err =>
      res.status(404).json({ noresellerfound: "No reseller found with that id" })
    );
  }
)

router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    idreseller = req.params.id;
    const { errors, isValid } = validateResellerInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const resellerFields = {};
    if (req.body.reseller_name) resellerFields.reseller_name = req.body.reseller_name;
    if (req.body.reseller_description) resellerFields.reseller_description = req.body.reseller_description;
    if (req.body.category_reseller) resellerFields.category_reseller = req.body.category_reseller;
    if (req.body.reseller_expired) resellerFields.reseller_expired = req.body.reseller_expired;
    if (req.body.status) resellerFields.status = req.body.status;
    
    Reseller.findOne({ id: req.params.id }).then(reseller => {
      if (reseller) {
        Reseller.findOneAndUpdate(
          { id: req.params.id },
          { $set: resellerFields },
          { new: true }
        ).then(reseller => {
          res.json(reseller);
        });
      } else {
          new Reseller(resellerFields).save().then(reseller => {
            return res.json(reseller);
          });
      }
    });
  }
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Reseller.findById(req.params.id)
        .then(reseller => {
          reseller.remove().then(() => res.json({ success: true }));
    });
  }
);




