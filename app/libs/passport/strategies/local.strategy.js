const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../../../models/user.model');

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {

    const user = await UserModel.findOne({ 'local.email': email });
    if(!user) {
      return done(null, false);
    }

    const passwordIsMatch = await user.isValidPassword(password);
    if(!passwordIsMatch) {
      return done(null, false);
    }

    return done(null, user);

  } catch (error) {
    done(error, false);
  }
});