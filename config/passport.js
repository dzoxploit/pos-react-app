const JwtStratgey = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Karyawan = mongoose.model("karyawan");
const Admin = mongoose.Model("Admin");
const keys = require("../config/keys");
var passport_admin = require('../node_modules/passport'); 
var passport_user = require('../node_modules/passport');
var passport_karyawan = require('../node_modules/passport') 
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use('user-rule', 
  new JwtStratgey(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
    })
  );
  passport.use('karyawan-rule', 
  new JwtStratgey(opts, (jwt_payload, done) => {
    Karyawan.findById(jwt_payload.id)
    .then(karyawan=> {
      if (karyawan) {
        return done(null, karyawan);
      }
      return done(null, false);
    })
      .catch(err => console.log(err));
    })
  );
  passport.use('admin-rule', 
  new JwtStratgey(opts, (jwt_payload, done) => {
    Admin.findById(jwt_payload.id)
    .then(admin => {
      if (admin) {
        return done(null, admin);
      }
      return done(null, false);
  })
      .catch(err => console.log(err));
    })
  )
  passport.use('reseller-rule', 
  new JwtStratgey(opts, (jwt_payload, done) => {
    Reseller.findById(jwt_payload.id)
    .then(reseller=> {
      if (reseller) {
        return done(null, reseller);
      }
      return done(null, false);
    })
      .catch(err => console.log(err));
    })
  )
  
};
