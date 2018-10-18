const express = require('express');
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
app.use(passport.initialize());
// Routes
app.use(routes);

// Start the server

app.use((error, req, res, next) => {
  console.log(error);
})

module.exports = app;
