const express = require('express');
const router = express.Router();

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

let categories;

// global temp variables to hold user's search query and chosen category. may be used throughout all js and ejs files
global.holdSearch = "";
global.holdCategory = "All Categories";

knex("Categories").select('Category').then(function(ret){
 categories=ret;
}).then();

router.get("/register", (req, res)=> {

   res.render("register",{
      categories: categories
   })

   res.redirect("/login", {
      categories: categories
   })
})

router.get("/post", (req, res)=> {

   res.render("post",{
      categories: categories
   })
})

router.get("/login", (req, res)=> {

   res.render("login",{
      categories: categories
   })

   res.redirect("/user-dashboard", {
      categories: categories
   })
})

router.get("/", (req, res, next)=> {

   knex("Items")
   .join('Users', 'Items.UserID', '=', 'Users.ID')
   .select('Items.Title', 'Users.UserName', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
   .then(function(items) {
      res.render("items",{
         items: items,
         categories: categories
      })
   });

})

router.post("/register", (req, res, next)=> {

   return knex('Users')
   .insert(
   {
      UserName: req.body.username,
      FirstName: req.body.name,
      LastName: req.body.lastname,
      Password: req.body.password
   })
   .then(   res.redirect("/"));
})

router.post("/post", (req, res, next)=> {

   return knex('Items')
   .insert(
   {
      UserID: 1,
      Title: req.body.name,
      Price: req.body.price,
      Description: req.body.descrition,
      Category: req.body.category
   })
   .then(   res.redirect("/"));
})

router.post("/items-search", (req, res, next)=> {
   let string = "%"+req.body.search+"%";

   global.holdSearch = req.body.search;
   global.holdCategory = req.body.dropdown;

   console.log("Searching for: " + string +" Category: "+ req.body.dropdown);

   if(req.body.dropdown == 'Select One'){
      knex('Items')
      .join('Users', 'Items.UserID', '=', 'Users.ID')
      .where('Title', 'ilike', string)
      .then(function(items) {
         if(items.length == 0){
            console.log("No results");
            knex('Items')
            .then(
               knex.select('Items.Title', 'Users.UserName', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
               .then(function(items) {
                  res.render('items',{items: items, categories: categories});
               }));
         }else{
            res.render('items',{items: items, categories: categories});
         }
      });
   }else{
      knex('Items')
      .join('Users', 'Items.UserID', '=', 'Users.ID')
      .where('Title', 'ilike', string)
      .where('Category', req.body.dropdown)
      .then(function(items) {
         if(items.length == 0){
            console.log("No results");
            knex('Items')
            .then(
               knex.select('Items.Title', 'Users.UserName', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
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