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
  callbackURL: 'http://localhost:3000/auth/facebook/redirect',
  clientID: '',
  clientSecret: '',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile);
    // const userExist = await UserModel.findOne({ 'google.id': profile.id });
    // if(userExist) {
    //   return done(null, userExist);
    // }

    // const newUser = new UserModel({
    //   method: 'google',
    //   google: {
    //     id: profile.id,
    //     email: profile.emails[0].value,
    //   }
    // });

    // await newUser.save();
    // return done(null, newUser);

  } catch (error) {
    done(error, false);
  }
});