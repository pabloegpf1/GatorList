const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const request = require('request');
const Knex = require('knex');
const knex = Knex(require('./knexfile')[process.env.NODE_ENV || 'development']);
const expressLayouts = require('express-ejs-layouts');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret', //ToDo we need to change this (is an env var needed, would that even work?)
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/about', aboutRouter);

app.use(expressLayouts);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new localStrategy({
  passReqToCallback: true
},function(req, username, password, done) {
  knex('Users').where('username',username)
  .then(function(user) {
    console.log("user: "+user[0].username);
    if (user[0] == null) {
      return done(null, false, req.flash('authMessage', "User not valid"));
    }
    if (bcrypt.compareSync(password, user[0].password)) {
      return done(null, user);
    } else {
    	console.log('test');
      return done(null, false, req.flash('authMessage', "Invalid password"));
    }
  }).catch(function(err) {
   return done(null, false, req.flash('authMessage', "User not found"));
 })
}));

knex.migrate
.latest()
.then(() =>
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Running on port ${process.env.PORT || 5000}!`)
    )
  );