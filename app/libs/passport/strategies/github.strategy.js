const passport = require('passport');
const GithubStrategy = require('passport-github');
const UserModel = require('../../../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

module.exports = new GithubStrategy({
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET_KEY,
}, async (accessToken, refreshToken, profile, done) => {
  try {

    const userExist = await UserModel.findOne({ 'github.id': profile.id });
    if(userExist) {
      return done(null, userExist);
    }

    const newUser = new UserModel({
      method: 'github',
      github: {
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