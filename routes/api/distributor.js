// @ts-nocheck
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Reselller = require("../../models/Distributor");
const Admin = require("../../models/Admin");
const validateReseller = require("../../validations/distributor");

router.get("test/distributor", (req, res) => {
    res.json({msg1: "Distributor works"});
});
router.get("/distributor",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    const errors = {};
    Distributor.find()
      .populate("distributor",
       ["distributor_code", 
        "distributor_name",
        "distributor_description",
        "category_scala_distributor_code",
        "distributor_no_npwp",
        "distributor_address",
        "distributor_phone_number"
        "distributor_coordinate_location"
        "distributor_surat_mou"
        "status_expired_distributor",
        "distributor_date_expired"
        "status_distributor"
      ])
      .then(distributor => {
        if (!distributor) {
          errors.nodistributor = "Distributor Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(distributor);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.get("/distributor/category-distributor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    CategoryScalaDistributor.find()
      .populate("category_scala_distributor",
       ["category_scala_distributor_code", 
        "category_scala_distributor_name"
      ])
      .where({ 'status': '1' })
      .then(categorydistributor => {
        if (!categorydistributor) {
          errors.nocategorydistributor = "Category distributor Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(categorydistributor);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validateDistributorInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const newDistributor = new Distributor({
        distributor_code: req.body.distributor_code,
        distributor_name: req.body.distributor_name,
        distributor_description: req.body.distributor_description,
        category_scala_distributor_code: req.body.category_scala_distributor_code,
        distributor_no_npwp: req.body.distributor_no_npwp,
        distributor_address: req.body.distributor_address,
        distributor_phone_number: req.body.distributor_phone_number,
        distributor_coordinate_location: req.body.distributor_coordinate_location,
        distributor_surat_mou: req.body.distributor_surat_mou,
        status_expired_distributor: req.body.status_expired_distributor,
        distributor_date_expired: req.body.distributor_date_expired,
        status_distributor: req.body.status_distributor,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at  
      });

      newDistributor.save().then(distributor => res.json(distributor));
    }
);

router.get(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req,res) => {
    Distributor.findById(req.params.id)
    .then(distributor => res.json(distributor))
    .catch(err =>
      res.status(404).json({ nodistributorfound: "No distributor found with that id" })
    );
  }
)

router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    idreseller = req.params.id;
    const { errors, isValid } = validateDistributorInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const distributorFields = {};
    if (req.body.distributor_name) distributorFields.distributor_name = req.body.distributor_name;
    if (req.body.distributor_description) distributorFields.distributor_description = req.body.distributor_description;
    if (req.body.category_scala_distributor_code) distributorFields.category_scala_distributor_code = req.body.category_scala_distributor_code;
    if (req.body.distributor_no_npwp) distributorFields.distributor_no_npwp = req.body.distributor_no_npwp;
    if (req.body.distributor_address) distributorFields.distributor_address = req.body.distributor_address;
    
    if (req.body.distributor_phone_number) distributorFields.distributor_phone_number = req.body.distributor_phone_number;
    if (req.body.distributor_coordinate_location) distributorFields.distributor_coordinate_location = req.body.distributor_coordinate_location;
    if (req.body.distributor_surat_mou) distributorFields.distributor_surat_mou = req.body.distributor_surat_mou;
    if (req.body.status_expired_distributor) distributorFields.status_expired_distributor = req.body.status_expired_distributor;
    if (req.body.distributor_date_expired) distributorFields.distributor_date_expired = req.body.distributor_date_expired;
    if (req.body.status_distributor) distributorFields.status_distributor = req.body.status_distributor;
    
    Distributor.findOne({ id: req.params.id }).then(distributor => {
      if (distributor) {
        Distributor.findOneAndUpdate(
          { id: req.params.id },
          { $set: distributorFields },
          { new: true }
        ).then(distributor => {
          res.json(distributor);
        });
      } else {
          new Distributor(distributorFields).save().then(distributor => {
            return res.json(distributor);
          });
      }
    });
  }
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Distributor.findById(req.params.id)
        .then(distributor => {
          distributor.remove().then(() => res.json({ success: true }));
    });
  }
);




