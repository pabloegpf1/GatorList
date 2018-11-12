const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

let categories;
knex("Categories").select('Category').then(function(ret){
  categories=ret;
}).then();


router.get("/", (req, res,next)=> {

   res.render("team",{categories: categories})
})

router.get("/register", (req, res)=> {
   var hash = bcrypt.hashSync(req.query.password, salt);
   knex('Users')
   .insert({
      UserName: req.query.username,
      Password: hash,
      firstName: req.query.name,
      lastName: req.query.lastname
   }).then(
   res.redirect('/')
   );
})

module.exports = router;