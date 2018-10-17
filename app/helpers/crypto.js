const bcrypt = require('bcryptjs');

module.exports = {
  hash: (payload) => {
    return bcrypt.hash(payload, 10);
  },

  compare: (plainString, hash) => {
    return bcrypt.compare(plainString, hash);
  }
}