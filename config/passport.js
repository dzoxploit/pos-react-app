const JwtStratgey = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStratgey(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
      Admin.findById(jwt_payload.id)
        .then(admin => {
          if (admin) {
            return done(null, admin);
          }
          return done(null, false);
      })
        Karyawan.findById(jwt_payload.id)
        .then(karyawan=> {
          if (karyawan) {
            return done(null, karyawan);
          }
          return done(null, false);
        })

        Cashier.findById(jwt_payload.id)
        .then(cashier => {
          if (cashier) {
            return done(null, cashier);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
