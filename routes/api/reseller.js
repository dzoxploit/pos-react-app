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

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validateResellerInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const newReseller = new Reselller({
        reseller_code: req.body.reseller_code,
        reseller_name: req.body.reseller_name,
        reseller_description: req.body.reseller_description,
        category_reseller: req.body.category_reseller,
        status: req.body.status,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at  
      });

      newReseller.save().then(reseller => res.json(reseller));
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




