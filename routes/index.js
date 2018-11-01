const express = require('express');
const router = express.Router();

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

let categories;
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

router.get("/admin-dashboard", (req, res)=> {

   res.render("admin-dashboard",{
      categories: categories
   })
})

router.get("/admin-review", (req, res)=> {

   res.render("admin-review",{
      categories: categories
   })
})

router.get("/user-dashboard", (req, res)=> {

   res.render("user-dashboard",{
      categories: categories
   })
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