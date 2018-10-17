const JWT = require('jsonwebtoken');

module.exports = {
  sign: (payload) => {
    return JWT.sign(payload, 'test123232312');
  },

  decode: (token) => {
    return JWT.decode(token);
  }
}