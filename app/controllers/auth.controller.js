const { User } = require('../models');
const { sign } = require('../helpers/token');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userExist = await User.findOne({ 'local.email': email });

      if(userExist) {
        return res.status(400).json({ error: 'User already exist' })
      }

      const newUser = new User({
        method: 'local',
        local: {
          email,
          password
        }
      });
      await newUser.save();
      
      const token = sign({
        sub: newUser.id, 
        iat: new Date().getTime(),
      }); 
      res.json({ token, user: newUser });
    } catch (error) {
      return next(error);
    }
  },

  signin: async (req, res, next) => {
    try {
      const token = sign({
        sub: req.user.id, 
        iat: new Date().getTime(),
      });
      res.json({ token, user: req.user });
    } catch (error) {
      return next(error);
    }
  },

  googleSignIn: (req, res, next) => {
    try {
      const { user } = req;
      const token = sign({
        sub: req.user.id, 
        iat: new Date().getTime(),
      });
      res.json({ token, user }); 
    } catch (error) {
      return next(error);
    }
  },

  facebookSignIn: (req, res, next) => {
    try {
      const { user } = req;
      const token = sign({
        sub: req.user.id, 
        iat: new Date().getTime(),
      });
      res.json({ token, user }); 
    } catch (error) {
      return next(error);
    }
  },

  githubSignIn: (req, res, next) => {
    try {
      const { user } = req;
      const token = sign({
        sub: req.user.id, 
        iat: new Date().getTime(),
      });

      res.json({ token, user }); 
    } catch (error) {
      return next(error);
    }
  },

  linkedinSignIn: (req, res, next) => {
    try {
      const { user } = req;
      const token = sign({
        sub: req.user.id, 
        iat: new Date().getTime(),
      });

      res.json({ token, user }); 
    } catch (error) {
      return next(error);
    }
  },

  secret: async (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
}