const express = require('express');
const router = express.Router();

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

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

router.get("/", (req, res, next)=> {

  var categories
  knex("Categories").select('Category').then(function(ret){
     categories=ret
     return knex("Items").select('Title', 'userID', 'Category', 'image')
  })
  .then(function(items) {
   res.render("items",{
      items: items,
      categories: categories
   })
});
})

router.post("/items-search", (req, res, next)=> {
   let string = "%"+req.body.search+"%";
   console.log("Searching for: " + string);
   knex('Items')
   .where('Title', 'ilike', string)
   .then(function(items) {
      if(items.length == 0){
         console.log("No results");
         knex('Items')
         .then(
            knex.select('Title', 'userID', 'Category', 'image').from('Items')
            .then(function(items) {
               res.render('items',{items: items});
            }));
      }else{
         res.render('items',{items: items});
      }
   });
})


module.exports = router;
