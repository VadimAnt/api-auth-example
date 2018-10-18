const router = require('express').Router();
const passport = require('passport');
const { AuthController } = require('../controllers');
const { validate, AuthValidation } = require('../validations');

const JwtMiddleware = passport.authenticate('jwt', { session: false });
const localMiddleware = passport.authenticate('local', { session: false });
const GoogleMeddleware = passport.authenticate('google');
const FacebookMeddleware = passport.authenticate('facebook', { session: false });
const GithubMeddleware = passport.authenticate('github', { session: false });
const LinkedinMeddleware = passport.authenticate('linkedin', { session: false });

router.post('/signup', 
  validate(AuthValidation.signup), 
  AuthController.signup
);

router.post('/signin', 
  validate(AuthValidation.signin), 
  localMiddleware, 
  AuthController.signin
);

router.get('/secret',   
  JwtMiddleware, 
  AuthController.secret
);

router.get('/google', 
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] }), 
);

router.get('/google/redirect', 
  GoogleMeddleware,
  AuthController.googleSignIn,
);

router.get('/facebook', 
  passport.authenticate('facebook', { session: false, scope: ['email'] }), 
);

router.get('/facebook/redirect', 
  FacebookMeddleware,
  AuthController.facebookSignIn,
);

router.get('/github', 
  passport.authenticate('github', { session: false, scope: ['email'] }), 
);

router.get('/github/redirect', 
  GithubMeddleware,
  AuthController.githubSignIn,
);

router.get('/linkedin', 
  passport.authenticate('linkedin', { session: false, scope: ['r_basicprofile', 'r_emailaddress'] }), 
);

router.get('/linkedin/redirect', 
  LinkedinMeddleware,
  AuthController.linkedinSignIn,
);

module.exports = router;