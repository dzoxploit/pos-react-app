const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/Barang");
const User = require("../../models/Admin");
const validateBarangInput = require("../../validations/barang");
const validateDetailBarangInput = require("../../validations/detail_barang");
const validateBarangMasukInput = require("../../validations/barang_masuk");
const validateBarangKeluarInput = require("../../validations/barang_keluar");

router.get("/test/barang", (req, res) => {
  res.json({ msg1: "Barang works" });
});

router.get("/barang",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Barang.find()
      .populate("barang",
       ["barang_code", 
        "nama_barang",
        "description",
        "jumlah_barang_siap_jual",
        "jumlah_barang_reject",
        "status_fixed_harga",
        "harga_beli",
        "harga_jual",
        "status_barang",
        "date",
      ])
      .then(barang => {
        if (!barang) {
          errors.nopbarang = "Barang Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(barang);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.post("/update/:id",
passport.authenticate("jwt", { session: true }),
(req, res) => {
  var idbarang = req.params.id;
  var barang = {
    name: req.body.nama_barang,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    supplier: req.body.supplier,
    taxable: req.body.taxable
  };

  Barang.findByIdAndUpdate(idbarang, barang, { new: true }, function(
    err,
    barang
  ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(inventory);
    }
  });
});
router.get("/barang/:slug",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  const errors = {};
  Barang.findOne({ slug: req.params.slug})
    .populate("barang",
     ["barang_code", 
      "nama_barang",
      "description",
      "jumlah_barang_siap_jual",
      "jumlah_barang_reject",
      "status_fixed_harga",
      "harga_beli",
      "harga_jual",
      "discount_barang",
      "harga_promo",
      "batas_harga_promo",
      "status_barang",
      "date",
    ])
    .then(barang => {
      if (!barang) {
        errors.barang = "Barang Tidak Ada";
        return res.status(404).json(errors);
      }
      return res.json(barang);
    })
    .catch(err => res.status(404).json(err));
}
);
router.get("/barang/gudang/:barang_slug",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  const errors = {};
  Barang.findOne({ slug: req.params.slug})
    .populate("barang",
     ["barang_code", 
      "nama_barang",
      "description",
      "jumlah_barang_siap_jual",
      "jumlah_barang_reject",
      "status_fixed_harga",
      "harga_beli",
      "harga_jual",
      "discount_barang",
      "harga_promo",
      "batas_harga_promo",
      "status_barang",
      "date",
    ])
    .then(barang => {
      if (!barang) {
        errors.nopbarang = "Barang yang dipilih Tidak Ada";
        return res.status(404).json(errors);
      }
      return res.json(barang);
    })
    .catch(err => res.status(404).json(err));
}
);

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

router.post(
  "/client/barang",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBarangInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const BarangFields = {};
    BarangFields.user = req.barang.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ barang: req.barang.id }).then(profile => {
      if (barang) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle alraedy exists";
            res.status(400).json(errors);
          }

          new Profile(profileFields).save().then(profile => {
            return res.json(profile);
          });
        });
      }
    });
  }
);

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

router.post(
  "/add-barang-masuk",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    BarangMasuk.findOne({ barang: req.barang.id }).then(barangmasuk => {
      const newExp = {
        barang_code: req.barang.barang_code,
        distributor: req.body.distributor,
        status_barang_masuk: req.body.status_barang_masuk,
      };

      barang.barang_masuk.unshift(newExp);

      barangmasuk.save().then(barangmasuk => res.json(barangmasuk));
    });
  }
);
router.post(
  "/add-detail-barang-bagus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    BarangMasuk.findOne({ barang: req.barang.id }).then(barangmasuk => {
      const newExp = {
        barang_code: req.barang.barang_code,
        distributor: req.body.distributor,
        status_barang_masuk: req.body.status_barang_masuk,
      };

      barang.barang_masuk.unshift(newExp);

      barangmasuk.save().then(barangmasuk => res.json(barangmasuk));
    });
  }
);
router.post(
  "/add-detail-barang-cacat",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    BarangMasuk.findOne({ barang: req.barang.id }).then(barangmasuk => {
      const newExp = {
        barang_code: req.barang.barang_code,
        distributor: req.body.distributor,
        status_barang_masuk: req.body.status_barang_masuk,
      };

      barang.barang_masuk.unshift(newExp);

      barangmasuk.save().then(barangmasuk => res.json(barangmasuk));
    });
  }
);

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => res.json({ success: false }));
  }
);

module.exports = router;
