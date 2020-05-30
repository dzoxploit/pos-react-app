// @ts-nocheck
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Reselller = require("../../models/BahanBaku");
const Admin = require("../../models/Admin");
const validateReseller = require("../../validations/bahanbaku");

router.get("test/bahan-baku", (req, res) => {
    res.json({msg1: "Bahan Baku works"});
});
router.get("/bahan-baku",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    const errors = {};
    Gudang.find()
      .populate("bahanbaku",
       ["bahan_baku_code", 
        "nama_bahan_baku",
        "description_bahan_baku",
        "distributor",
        "satuan",
        "jumlah_bahan_baku",
        "jumlah_bahan_baku_rusak",
        "status_bahan_baku",
        "harga_beli_bahan_baku_satuan",
        "biaya_bahan_baku_semua",
        "location_gudang"
      ])
      .then(bahanbaku => {
        if (!bahanbaku) {
          errors.nobahanbaku = "Bahan Baku Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(bahanbaku);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validateBahanBakuInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const newBahanBaku = new BahanBaku({

        nama_bahan_baku: req.body.nama_bahan_baku,
        description_bahan_baku: req.body.description_bahan_baku,
        distributor: req.body.distributor,
        satuan: req.body.satuan,
        jumlah_bahan_baku: req.body.jumlah_bahan_baku,
        jumlah_bahan_baku_rusak: req.body.jumlah_bahan_baku_rusak,
        status_bahan_baku: req.body.status_bahan_baku,
        harga_beli_bahan_baku_satuan: req.body.harga_beli_bahan_baku_satuan,
        biaya_bahan_baku_semua: req.body.biaya_bahan_baku_semua,
        location_gudang: req.body.location_gudang
      });

      newBahanBaku.save().then(bahanbaku => res.json(bahanbaku));
    }
);
router.post(
  "bahan-baku/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBahanBakuInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newBahanBaku = new BahanBaku({

      nama_bahan_baku: req.body.nama_bahan_baku,
      description_bahan_baku: req.body.description_bahan_baku,
      distributor: req.body.distributor,
      satuan: req.body.satuan,
      jumlah_bahan_baku: req.body.jumlah_bahan_baku,
      jumlah_bahan_baku_rusak: req.body.jumlah_bahan_baku_rusak,
      status_bahan_baku: req.body.status_bahan_baku,
      harga_beli_bahan_baku_satuan: req.body.harga_beli_bahan_baku_satuan,
      biaya_bahan_baku_semua: req.body.biaya_bahan_baku_semua,
      location_gudang: req.body.location_gudang
    });

    newBahanBaku.save().then(bahanbaku => res.json(bahanbaku));
  }
);

router.get(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req,res) => {
    BahanBaku.findById(req.params.id)
    .then(bahanbaku => res.json(bahanbaku))
    .catch(err =>
      res.status(404).json({ nobahanbakufound: "No Bahan Baku found with that id" })
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

    const bahanbakuFields = {};
    if (req.body.nama_bahan_baku) bahanbakuFields.nama_bahan_baku = req.body.nama_bahan_baku;
    if (req.body.description_bahan_baku) bahanbakuFields.description_bahan_baku = req.body.description_bahan_baku;
    if (req.body.distributor) bahanbakuFields.distributor = req.body.distributor;
    if (req.body.satuan) bahanbakuFields.satuan = req.body.satuan;
    if (req.body.jumlah_bahan_baku) bahanbakuFields.jumlah_bahan_baku = req.body.jumlah_bahan_baku;
    if (req.body.jumlah_bahan_baku_rusak) bahanbakuFields.jumlah_bahan_baku_rusak = req.body.jumlah_bahan_baku_rusak;
    if (req.body.status_bahan_baku) bahanbakuFields.status_bahan_baku = req.body.status_bahan_baku;
    if (req.body.satuan) bahanbakuFields.satuan = req.body.satuan;
  BahanBaku.findOne({ id: req.params.id }).then(bahanbaku => {
      if (bahanbaku) {
        BahanBaku.findOneAndUpdate(
          { id: req.params.id },
          { $set: bahanbakuFields },
          { new: true }
        ).then(bahanbaku => {
          res.json(bahanbaku);
        });
      } else {
          new BahanBaku(bahanbakuFields).save().then(bahanbaku => {
            return res.json(bahanbaku);
          });
      }
    });
  }
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    BahanBaku.findById(req.params.id)
        .then(bahanbaku => {
          bahanbaku.remove().then(() => res.json({ success: true }));
    });
  }
);




