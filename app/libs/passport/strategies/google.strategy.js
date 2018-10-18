const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const UserModel = require('../../../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

module.exports = new GoogleStrategy({
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    
    const userExist = await UserModel.findOne({ 'google.id': profile.id });
    if(userExist) {
      return done(null, userExist);
    }

    const newUser = new UserModel({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value,
      }
    });

    await newUser.save();
    return done(null, newUser);

  } catch (error) {
    done(error, false);
  }
});