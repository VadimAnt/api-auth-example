const JWT = require('jsonwebtoken');

module.exports = {
  sign: (payload) => {
    return JWT.sign(payload, process.env.JWT_SECRET_KEY);
  },

  decode: (token) => {
    return JWT.decode(token);
  }
}