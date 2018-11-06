const express = require('express');
const router = express.Router();

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

router.get("/", (req, res, next)=> {

   res.render("register");
})

router.get("/register", (req, res)=> {

   knex('Users')
   .insert({
      UserName: req.query.username,
      Password: req.query.password,
      firstName: req.query.name,
      lastName: req.query.lastname
   }).then(
   res.redirect('/users')
   );
})

router.get("/users", (req, res, next)=> {
   knex('Users')
   .then(
      knex.select('UserName', 'firstName', 'Password').from('Users')
      .then(function(users) {
         res.render('users',{users: users});
      }));
})

router.post("/users-search", (req, res, next)=> {
   console.log("Searching for: "+req.body.search);
   knex('Users')
   .where('UserName', req.body.search)
   .then(function(users) {
      res.render('users',{users: users});
   });
})


module.exports = router;
