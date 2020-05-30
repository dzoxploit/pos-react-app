const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Category = require("../../models/Category");
const CategoryCodePromo = require("../../models/CategoryCodePromo");
const CategoryGudang = require("../../models/CategoryGudang");
const CategoryDetail = require("../../models/CategoryDetail");
const CategoryReseller = require("../../models/CategoryReseller");
const CategoryScalaDistributor = require("../../models/CategoryScalaDistributor");


const User = require("../../models/Admin");
const validateCategoryInput = require("../../validations/category");
const validateCategoryCodePromoInput = require("../../validations/category_code_promo");
const validateBarangMasukInput = require("../../validations/barang_masuk");
const validateBarangKeluarInput = require("../../validations/barang_keluar");
router.get("/test/barang", (req, res) => {
  res.json({ msg1: "Barang works" });
});

router.get("/category",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Category.find()
      .populate("barang",
       ["category_code", 
        "category_name",
        "description",
        "category_slug",
        "path_category_file",
        "status_category",
        "created_at",
        "updated_at",
      ])
      .then(category => {
        if (!category) {
          errors.categorycode = "Category Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(category);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.get("/category-code-promo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    CategoryCodePromo.find()
      .populate("category_code_promo",
       ["category_code_promo_name", 
        "status_category_code_promo",
        "created_at",
        "updated_at",
      ])
      .then(categorycodepromo => {
        if (!categorycodepromo) {
          errors.categorycodepromo = "Category Promo Code Tidak Ada";
          return res.status(404).json(errors);
        }
        return res.json(categorycodepromo);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.get("/category-detail",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    CategoryDetail.find()
      .populate("category_detail",
       ["category_detail_code", 
        "category_detail_name",
        "category_slug_detail",
        "path_icon_category_detail", 
        "description",
        "status",
        "created_at",
        "updated_at",
      ])
      .then(categorydetail => {
        if (!categorydetail) {
          errors.categorydetail = "Category Detail";
          return res.status(404).json(errors);
        }
        return res.json(categorydetail);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.get("/category-gudang",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    CategoryGudang.find()
      .populate("category_gudang",
       ["category_gudang_code", 
        "category_gudang_name",
        "category_slug_detail",
        "path_icon_category_detail", 
        "description",
        "status",
        "created_at",
        "updated_at",
      ])
      .then(categorygudang => {
        if (!categorygudang) {
          errors.categorygudang = "Category Detail";
          return res.status(404).json(errors);
        }
        return res.json(categorygudang);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.get("/category-reseller",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    CategoryReseller.find()
      .populate("category_reseller",
       ["category_reseller_code", 
        "category_reseller_name",
        "category_reseller_description",
        "status",
        "created_at",
        "updated_at",
      ])
      .then(categoryreseller => {
        if (!categoryreseller) {
          errors.categoryreseller = "Category Reseller";
          return res.status(404).json(errors);
        }
        return res.json(categoryreseller);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.post("category/update/:id",
passport.authenticate("jwt", { session: true }),
(req, res) => {
  var idcategory = req.params.id;
  var category = {
    category_name: req.body.category_name,
    category_slug: req.body.category_slug,
    path_category_file: req.body.path_category_file,
    status_category: req.body.status_category,
  };

  Category.findByIdAndUpdate(idcategory, category, { new: true }, function(
    err,
    category
  ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(category);
    }
  });
});
router.post("category-reseller/update/:id",
passport.authenticate("jwt", { session: true }),
(req, res) => {
  var idcategoryreseller = req.params.id;
  var categoryreselller = {
    category_reseller_name: req.body.category_reseller_name,
    category_reseller_description: req.body.category_reseller_description,
    status: req.body.status,
  };

  CategoryReseller.findByIdAndUpdate(idcategoryreseller, categoryreseller, { new: true }, function(
    err,
    categoryreseller
  ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(categoryreseller);
    }
  });
});
router.post("category-gudang/update/:id",
passport.authenticate("jwt", { session: true }),
(req, res) => {
  var idcategorygudang = req.params.id;
  var categoryreselller = {
    category_gudang_name: req.body.category_gudang_name,
    status_category_gudang: req.body.status_category_gudang,
  };

  CategoryGudang.findByIdAndUpdate(idcategorygudang, categorygudang, { new: true }, function(
    err,
    categorygudang
  ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(categorygudang);
    }
  });
});
router.post("category-code-promo/update/:id",
passport.authenticate("jwt", { session: true }),
(req, res) => {
  var idcategorycodepromo = req.params.id;
  var categorycodepromo = {
    category_code_promo_name: req.body.category_code_promo_name,
    status_category_code_promo: req.body.status_category_code_promo,
  };

  CategoryCodePromo.findByIdAndUpdate(idcategorycodepromo, categorycodepromo, { new: true }, function(
    err,
    categorycodepromo
  ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(categorycodepromo);
    }
  });
});
route.post("category-scala-distributor/update/:id",
passport.authenticate("jwt", { session: true }),
(req, res) => {
  var idcategoryscaladistributor = req.params.id;
  var categoryscaladistributor =  {
    category_scala_distributor_name: req.body.category_scala_distributor_name,
    status: req.body.status,
  };
  CategoryScalaDistributor.findByIdAndUpdate(idcategoryscaladistributor, categoryscaladistributor, { new: true }, function(
    err,
    categoryscaladistributor
  ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(categoryscaladistributor);
    }
  });
});
route.post("category-detail/update/:id",
passport.authenticate("jwt", { session: true }),
(req, res) => {
  var idcategorydetail = req.params.id;
  var categoryscaladistributor =  {
    category_scala_distributor_name: req.body.category_scala_distributor_name,
    status: req.body.status,
  };
  CategoryScalaDistributor.findByIdAndUpdate(idcategoryscaladistributor, categoryscaladistributor, { new: true }, function(
    err,
    categoryscaladistributor
  ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(categoryscaladistributor);
    }
  });
});
router.get("/category/:slug",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  const errors = {};
  category.findOne({ slug: req.params.slug})
    .populate("barang",
     ["category_code", 
      "category_name",
    ])
    .then(category => {
      if (!category) {
        errors.category = "Category Not Found";
        return res.status(404).json(errors);
      }
      return res.json(category);
    })
    .catch(err => res.status(404).json(err));
}
);
router.get("/category/edit/:category_id", (req, res) => {
  const errors = {};

  Category.findOne({ id: req.params.category_id })
    .then(category => {
      if (!category) {
        errors.nocategory = "Category not found";
        res.status(404).json(errors);
      }

      res.json(category);
    })
    .catch(err =>
      res.status(404).json({ category: "There is category not found" })
    );
});
router.get("/category-code-promo/edit/:category_promo_id", (req, res) => {
  const errors = {};

  CategoryCodePromo.findOne({ id: req.params.category_promo_id })
    .then(categorycodepromo => {
      if (!categorycodepromo) {
        errors.nocategorycodepromo = "Category Code Promo not found";
        res.status(404).json(errors);
      }

      res.json(categorycodepromo);
    })
    .catch(err =>
      res.status(404).json({ categorycodepromo: "There is category code promo not found" })
    );
});
router.get("/category-gudang/edit/:category_gudang_id", (req, res) => {
  const errors = {};

  CategoryGudang.findOne({ id: req.params.category_gudang_id })
    .then(categorygudang => {
      if (!categorygudang) {
        errors.nocategorygudang = "Category Gudang not found";
        res.status(404).json(errors);
      }

      res.json(categorygudang);
    })
    .catch(err =>
      res.status(404).json({ categorygudang: "There is category gudang not found" })
    );
});
router.get("/category-reseller/edit/:category_reseller_id", (req, res) => {
  const errors = {};

  CategoryReseller.findOne({ id: req.params.category_reseller_id })
    .then(categoryreseller => {
      if (!categoryreseller) {
        errors.nocategoryreseller = "Category Reseller not found";
        res.status(404).json(errors);
      }

      res.json(categoryreseller);
    })
    .catch(err =>
      res.status(404).json({ categoryreseller: "There is category reseller not found" })
    );
});
router.get("/category-scala-distributor/edit/:category_scala_distributor_id", (req, res) => {
  const errors = {};

  CategoryScalaDistributor.findOne({ id: req.params.category_scala_distributor_id })
    .then(categoryscaladistributor => {
      if (!categoryscaladistributor) {
        errors.nocategoryscaladistributor = "Category Scala Distributor not found";
        res.status(404).json(errors);
      }

      res.json(categoryscaladistributor);
    })
    .catch(err =>
      res.status(404).json({ categoryscaladistributor: "There is category scala distributor not found" })
    );
});
router.post(
  "/category-detail/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryDetailInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const CategoryFields = {};
    CategoryFields.user = req.category.id;
    if (req.body.category_name) categoryFields.category_name = req.body.category_name;
    if (req.body.category_slug) categoryFields.category_slug = req.body.category_slug;
    if (req.body.path_category_file) categoryFields.path_category_file = req.body.path_category_file;
    if (req.body.status) profileFields.status_category = req.body.status_category;
    

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
  "/category/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCategory = new Category({
      category_name: req.body.category_name,
      category_slug_slug: req.body.category_slug,
      path_category_file: req.body.path_category_file,
      status_category: req.body.status_category,
      admin: req.body.id
    });

    newCategory.save().then(category => res.json(category));
  }
);
router.post(
  "/category-code-promo/create",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    const { errors, isValid } = validateCategoryCodePromoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCategoryCodePromo = new CategoryCodePromo({
      category_code_promo_name: req.body.category_code_promo_name,
      status_category_code_promo: req.body.status_category_code_promo,
      admin: req.body.id
    });

    newCategoryCodePromo.save().then(categorycodepromo => res.json(categorycodepromo));
  }
);
router.post(
  "/category-reseller/create",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    const { errors, isValid } = validateCategoryResellerInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCategoryReseller = new CategoryReseller({
      category_reseller_name: req.body.category_reseller_name,
      category_reseller_description: req.body.category_reseller_description,
      status: req.body.status,
      admin: req.body.id
    });

    newCategoryReseller.save().then(categoryreseller => res.json(categoryreseller));
  }
);
router.post(
  "/category-gudang/create",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    const { errors, isValid } = validateCategoryGudangInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCategoryGudang = new CategoryGudang({
      category_gudang_name: req.body.category_gudang_name,
      status_category_gudang: req.body.status_category_gudang,
      admin: req.body.id
    });

    newCategoryGudang.save().then(categorygudang => res.json(categorygudang));
  }
);
router.post(
  "/category-scala-distributor/create",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    const { errors, isValid } = validateCategoryScalaDistributor(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCategoryScalaDistributor = new CategoryScalaDistributor({
      category_scala_distributor_name: req.body.category_scala_distributor_name,
      status: req.body.status,
      admin: req.body.id
    });

    newCategoryScalaDistributor.save().then(categoryscaladistributor => res.json(categoryscaladistributor));
  }
);
router.delete(
  "category/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
      Category.findById(req.params.id)
        .then(category => {
          category.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ categorynotfound: "No Category found" }));
  }
);

router.delete(
  "category-reseller/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
      CategoryReseller.findById(req.params.id)
        .then(categoryreseller => {
          categoryreseller.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ categoryresellernotfound: "No Category Reseller found" }));
  }
);
router.delete(
  "category-gudang/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
      CategoryGudang.findById(req.params.id)
        .then(categorygudang => {
          categorygudang.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ categorygudangnotfound: "No Category Gudang found" }));
  }
);
router.delete(
  "category-reseller/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
      CategoryReseller.findById(req.params.id)
        .then(categoryreseller => {
          categoryreseller.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ categoryresellernotfound: "No Category Reseller found" }));
  }
);
router.delete(
  "category-scala-distributor/:id",
  passport.authenticate("jwt", {session:false}),
  (req, res) => {
    CategoryScalaDistributor.findById(req.params.id)
      .then(categoryscaladistributor => {
        categoryscaladistributor.remove().then(() => res.json({success: true}));
      })
      .catch(err => res.status(404).json({categoryscaladistributornotfound: "No category scala distributor not found"}))
  }
);
router.delete(
  "category-code-promo/:id",
  passport.authenticate("jwt", {session:false}),
  (req, res) => {
    CategoryCodePromo.findById(req.params.id)
      .then(categorycodepromo => {
        categorycodepromo.remove().then(() => res.json({success: true}));
      })
      .catch(err => res.status(404).json({categorycodepromo: "No category code promo not found"}))
  }
);
module.exports = router;
