const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserModel = require('../../../models/user.model');

module.exports = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET_KEY,
}, async (payload, done) => {
  try {

    const user = await UserModel.findById(payload.sub);
    if(!user) {
      return done(null, false);
    }

    return done(null, user);

  } catch (error) {
    done(error, false);
  }
});