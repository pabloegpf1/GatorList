const express = require('express');
const router = express.Router();

const Knex = require('knex');
const knex = Knex(require('../knexfile') [process.env.NODE_ENV || 'development'])

router.get("/", (req, res, next)=> {

   res.render("index");
})

router.get("/index", (req, res)=> {
   var Category = req.body.category;
   var Search = req.body.search;
if (req.body.category == 'Category'){
   router.get("/index", (req, res, next)=> {
      knex('Items')
      .then(
         knex.select('picture', 'Title', 'userID').from('Items')
         .then(function(items) {
            res.render('users',{items: items});
         }));
   })
}else {
   router.get("/categorySearch", (req, res, next)=> {
      knex('Items')
      .where('Category', Category)
      .then(function(items) {
            res.render('items',{items: items});
         });
   })
}
if(req.body.search == ""){
   knex('Items')
   .then(function(items) {
      res.render('items',{items: items});
   }
}else{
   router.post("/item-search", (req, res, next)=> {
      console.log("Searching for: "+req.body.search);
      knex('Items')
      .where('ItemName', 'like,' '%'Search'%')
      .orWhere('ItemDescription', 'like,' '%'+Search+'%')
      .then(function(items) {
         res.render('items',{items: items});
      });
   })
}



module.exports = router;
