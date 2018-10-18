const passport = require('passport');
const LinkedinStrategy = require('passport-linkedin');
const UserModel = require('../../../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

module.exports = new LinkedinStrategy({
  callbackURL: process.env.LINKEDIN_CALLBACK_URL,
  consumerKey: process.env.LINKEDIN_CLIENT_ID,
  consumerSecret: process.env.LINKEDIN_SECRET_KEY,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile);
    const userExist = await UserModel.findOne({ 'linkedin.id': profile.id });
    if(userExist) {
      return done(null, userExist);
    }

    const newUser = new UserModel({
      method: 'linkedin',
      linkedin: {
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