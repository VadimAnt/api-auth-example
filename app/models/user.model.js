const mongoose = require('mongoose');
const { hash, compare } = require('../helpers/crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook', 'github'],
    required: true,
  },
  local: {
    email: {
      type: String,
      lowercase: true,
    },
    password: String,
  },
  google: {
    id: String,
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: String,
    email: {
      type: String,
      lowercase: true
    }
  },
  github: {
    id: String,
    email: {
      type: String,
      lowercase: true
    }
  },
});

userSchema.pre('save', async function (next) {
  try {
    if(this.method !== 'local') {
      next();
    }

    const passwordHash = await hash(this.local.password);
    this.local.password = passwordHash;
    next();
    
  } catch (error) {
    next(error);
  }
})

userSchema.methods.isValidPassword = async function (passwordPlain) {
  try {

    return compare(passwordPlain, this.local.password);

  } catch (error) {
    throw new Error(error);
  }
}

const User = mongoose.model('user', userSchema);

module.exports = User;
