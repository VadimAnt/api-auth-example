const passport = require('passport');
const JwtStrategy = require('./strategies/jwt.strategy');
const LocalStrategy = require('./strategies/local.strategy');
const GoogleStrategy = require('./strategies/google.strategy');
const FacebookStrategy = require('./strategies/facebook.strategy');
const GithubStrategy = require('./strategies/github.strategy');
const LinkedinStrategy = require('./strategies/linkedin.strategy');

passport.use(JwtStrategy);
passport.use(LocalStrategy);
passport.use(GoogleStrategy);
passport.use(FacebookStrategy);
passport.use(GithubStrategy);
passport.use(LinkedinStrategy);

module.exports = passport;