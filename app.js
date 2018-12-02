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
const multer = require('multer');
const AWS = require('aws-sdk');

var accessKeyId =  "AKIAIH7HFQQ5LFY54BJQ";
var secretAccessKey = "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";

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

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
},
function(req, username, password, done) {
  knex('Users').where('username',username)
  .then(function(user) {
    console.log("user: "+user[0].username);
    if (user[0] == null) {
      return done(null, false, req.flash('authMessage', "User not valid"));
    }
    if (user[0].password != password) {
      return done(null, false, req.flash('authMessage', "Invalid password"));
    }
    return done(null, user);
  }).catch(function(err) {
   return done(null, false, req.flash('authMessage', "User not found"));
 })
}));

let s3 = new AWS.S3();

var upload = multer({
  storage: multer({
    s3: s3,
    bucket: 'csc648team12',
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
});

app.post('/upload', function(req, res){
  if(req.files.image !== undefined){
        res.redirect("/uploads"); // success
      }else{
        res.send("error, no file chosen");
      }
    });

knex.migrate
.latest()
.then(() =>
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Running on port ${process.env.PORT || 5000}!`)
    )
  );