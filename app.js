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

var request = require('request');

const Knex = require('knex');
const knex = Knex(require('./knexfile')[process.env.NODE_ENV || 'development'])

var expressLayouts = require('express-ejs-layouts');

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

passport.use(new localStrategy(
 function(username, password, done) {
   knex('Users').where('username', '=',username)
   .then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
     }
     if (user[0].password != password) {
      console.log("incorrect password");
      return done(null, false, { message: 'Incorrect password.' });
   }
   return done(null, user);
})
}));

knex.migrate
.latest()
.then(() =>
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Running on port ${process.env.PORT || 5000}!`)
    )
  );