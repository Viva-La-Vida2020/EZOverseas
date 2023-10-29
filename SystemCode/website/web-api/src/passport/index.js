const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Client = require("../user/services");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

const strategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    let foundUser = null;
    if (jwt_payload.id) {
      foundUser = await Client.getUserInfoById(parseInt(jwt_payload.id));
    } else if (jwt_payload.email) {
      foundUser = await Client.getUserInfoByEmail(jwt_payload.email);
    } else if (jwt_payload.phone) {
      foundUser = await Client.getUserInfoByPhone(jwt_payload.phone);
    } else {
    }
    if (!foundUser) {
      return done(null, false);
    }
    return done(null, foundUser);
  } catch (error) {
    return done(error, null);
  }
});

module.exports = function (passport) {
  // token strategy
  passport.use(strategy);
  // return configured passport
  return passport;
};
