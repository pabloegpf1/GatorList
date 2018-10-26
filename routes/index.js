const express = require('express');
const router = express.Router();

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

let categories;
knex("Categories").select('Category').then(function(ret){
  categories=ret;
}).then();

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

   knex("Items")
   .select('Title', 'userID', 'Category', 'image')
   .then(function(items) {
      res.render("items",{
         items: items,
         categories: categories
      })
   });

})

router.get("/items-search", (req, res, next)=> {

   res.redirect("/");
})

router.post("/items-search", (req, res, next)=> {
   let string = "%"+req.body.search+"%";

   console.log("Searching for: " + string +" Category: "+ req.body.dropdown);

   if(req.body.dropdown == 'Select One'){
      knex('Items')
      .where('Title', 'ilike', string)
      .then(function(items) {
         if(items.length == 0){
            console.log("No results");
            knex('Items')
            .then(
               knex.select('Title', 'userID', 'Category', 'image').from('Items')
               .then(function(items) {
                  res.render('items',{items: items, categories: categories});
               }));
         }else{
            res.render('items',{items: items, categories: categories});
         }
      });
   }else{
      knex('Items')
      .where('Title', 'ilike', string)
      .where('Category', req.body.dropdown)
      .then(function(items) {
         if(items.length == 0){
            console.log("No results");
            knex('Items')
            .then(
               knex.select('Title', 'userID', 'Category', 'image').from('Items')
               .then(function(items) {
                  res.render('items',{items: items, categories: categories});
               }));
         }else{
            res.render('items',{items: items, categories: categories});
         }
      });
   }

})



module.exports = router;
