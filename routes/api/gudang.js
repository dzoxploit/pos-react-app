// @ts-nocheck
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Reselller = require("../../models/Gudang");
const Admin = require("../../models/Admin");
const validateReseller = require("../../validations/gudang");

router.get("test/gudang", (req, res) => {
    res.json({msg1: "Gudang works"});
});
router.get("/gudang",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    const errors = {};
    Gudang.find()
      .populate("gudang",
       ["location_gudang_code", 
        "location_gudang_name",
        "location_gudang_description",
        "category_gudang",
        "status_gudang"
      ])
      .then(gudang => {
        if (!gudang) {
          errors.nogudang = "Gudang Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(gudang);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validateGudangInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const newGudang = new Gudang({

        location_gudang_code: req.body.location_gudang_code,
        location_gudang_name: req.body.location_gudang_name,
        location_gudang_description: req.body.location_gudang_description,
        category_gudang: req.body.category_gudang,
        status_gudang: req.body.status_gudang,
      });

      newGudang.save().then(gudang => res.json(gudang));
    }
);

router.get(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req,res) => {
    Gudang.findById(req.params.id)
    .then(gudang => res.json(gudang))
    .catch(err =>
      res.status(404).json({ nogudangfound: "No Gudang found with that id" })
    );
  }
)

router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    idgudang = req.params.id;
    const { errors, isValid } = validateGudangInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const gudangFields = {};
    if (req.body.location_gudang_name) gudangFields.location_gudang_name = req.body.location_gudang_name;
    if (req.body.location_gudang_description) gudangFields.location_gudang_description = req.body.location_gudang_description;
    if (req.body.category_gudang) gudangFields.category_gudang = req.body.category_gudang;
    if (req.body.status_gudang) gudangFields.status_gudang = req.body.status_gudang;
    
    Gudang.findOne({ id: req.params.id }).then(gudang => {
      if (gudang) {
        Gudang.findOneAndUpdate(
          { id: req.params.id },
          { $set: gudangFields },
          { new: true }
        ).then(gudang => {
          res.json(gudang);
        });
      } else {
          new Gudang(gudangFields).save().then(gudang => {
            return res.json(gudang);
          });
      }
    });
  }
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Gudang.findById(req.params.id)
        .then(gudang => {
          gudang.remove().then(() => res.json({ success: true }));
    });
  }
);




