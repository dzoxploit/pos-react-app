// @ts-nocheck
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const ProductionBarang = require("../../models/ProductionBarang");
const Admin = require("../../models/Admin");
const validateProductionBarang = require("../../validations/productionbarang");

router.get("test/production-barang", (req, res) => {
    res.json({msg1: "Production barang works"});
});
router.get("/production-barang",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    ProductionBarang.find()
      .populate("production_barang",
       ["production_barang_code", 
        "barang",
        "description_production_barang",
        "jumlah_barang_production",
        "jumlah_barang_production_sukses",
        "jumlah_barang_production_gagal",
        "location_gudang",
        "status_production_barang",
        "date",
      ])
      .then(productionbarang => {
        if (!productionbarang) {
          errors.noproductionbarang = "Production Barang Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(productionbarang);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProductionBarangInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
      var defaultbarang = 0;
      const newProductionBarang = new ProductionBarang({
        barang: req.body.barang,
        description_production_barang: req.body.production,
        jumlah_barang_production: defaultbarang,
        jumlah_barang_production_sukses: defaultbarang,
        jumlah_barang_production_gagal: defaultbarang,
        location_gudang: req.body.location_gudang,
        status_production_barang: req.body.status_production_barang
      });
  
      newProductionBarang.save().then(productionbarang => res.json(productionbarang));
    }
);

router.get(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req,res) => {
    ProductionBarang.findById(req.params.id)
    .then(productionbarang => res.json(productionbarang))
    .catch(err =>
      res.status(404).json({ noproductionbarangfound: "No production barang found with that id" })
    );
  }
)

router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    idproductionbarang = req.params.id;
    const { errors, isValid } = validateProductionBarangInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const productionbarangFields = {};
    if (req.body.barang) productionbarangFields.barang = req.body.barang;
    if (req.body.description_production_barang) productionbarangFields.description_production_barang = req.body.description_production_barang;
    if (req.body.jumlah_barang_production) productionbarangFields.jumlah_barang_production = req.body.jumlah_barang_production;
    if (req.body.jumlah_barang_production_sukses) productionbarangFields.jumlah_barang_production_sukses = req.body.jumlah_barang_production_sukses;
    if (req.body.jumlah_barang_production_gagal) productionbarangFields.jumlah_barang_production_gagal = req.body.jumlah_barang_production_gagal;
    if (req.body.location_gudang) productionbarangFields.location_gudang = req.body.location_gudang;
    if (req.body.status_production_barang) productionbarangFields.status_production_barang = req.body.status_production_barang;
    
    productionbarangFields.clasification_production_barang = {};

    if (req.body.clasification_size_barang) productionbarangFields.clasification_production_barang.clasification_size_barang = req.body.youtube;
    if (req.body.clasification_production_barang_description) productionbarangFields.clasification_production_barang.clasification_production_barang_description = req.body.clasification_production_barang_description;
    if (req.body.clasification_production_barang_stock) productionbarangFields.clasification_production_barang.clasification_production_barang_stock = req.body.clasification_production_barang_stock;
    if (req.body.clasification_production_barang_description) productionbarangFields.clasification_production_barang.type_ukuran = req.body.type_ukuran;

    ProductionBarang.findOne({ id: req.params.id }).then(productionbarang => {
      if (productionbarang) {
        ProductionBarang.findOneAndUpdate(
          { id: req.params.id },
          { $set: productionbarangFields },
          { new: true }
        ).then(productionbarang => {
          res.json(productionbarang);
        });
      } else {
          new ProductionBarang(productionbarangFields).save().then(productionbarang => {
            return res.json(productionbarang);
          });
      }
    });
  }
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);




