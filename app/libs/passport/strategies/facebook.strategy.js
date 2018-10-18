const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const UserModel = require('../../../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

module.exports = new FacebookStrategy({
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_SECRET_KEY,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    
    const userExist = await UserModel.findOne({ 'facebook.id': profile.id });
    if(userExist) {
      return done(null, userExist);
    }

    const newUser = new UserModel({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.email ? profie.email : '',
      }
    });

    await newUser.save();
    return done(null, newUser);

  } catch (error) {
    done(error, false);
  }
});