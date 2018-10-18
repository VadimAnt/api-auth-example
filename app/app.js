const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('./libs/passport');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI, { 
  useNewUrlParser: true 
});

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(session({ secret: process.env.JWT_SECRET_KEY}))
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use(routes);

// 404
app.use((req, res, next) => {
  err.status = 404;
  next(err);
});

// Error handler error
app.use((error, req, res, next) => {
  console.log(error);
})

module.exports = app;
