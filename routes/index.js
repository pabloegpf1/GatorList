const express = require('express');
const router = express.Router();
const passport = require('passport');

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

let categories;

// global temp variables to hold user's search query and chosen category. may be used throughout all js and ejs files
global.holdSearch = "";
global.holdCategory = "All Categories";

knex("Categories").select('Category').then(function(ret){
  categories=ret;
}).then();

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
  );

router.get("/register", (req, res)=> {

 res.render("register",{
  categories: categories
})
})

router.post("/register", (req, res)=> {
  knex('Users')
  .insert(
  {
    username: req.body.username,
    FirstName: req.body.name,
    LastName: req.body.lastname,
    password: req.body.password
  })
  .then(res.redirect("/"));
})

router.get("/post", (req, res)=> {

 res.render("post",{
  categories: categories
})
})

router.get("/login", (req, res)=> {

 res.render("login",{
  categories: categories,
  authMessage: req.flash('authMessage')
})
})

router.get("/", (req, res, next)=> {

 knex("Items")
 .join('Users', 'Items.UserID', '=', 'Users.ID')
 .where('Approved',true)
 .select('Items.Title', 'Users.username', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
 .then(function(items) {
  res.render("items",{
   items: items,
   categories: categories
 })
});

})

router.post('/captcha', function(req, res) {
  if (req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null) {
    return res.json({ "success": false, "msg": "Please select captcha" });
}
    //const key
    const secretKey = "6LdOF3gUAAAAAJ1UCnxqwiknDtMa1aA2uj2Db_Us";

    //verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    //make request to VerifyUrl
    request(verifyUrl, (err, response, body) => {
      body = JSON.parse(body);

        //If Not successful
        if (body.success !== undefined && !body.success) {
         return res.json({ "success": false, "msg": "Failed captcha verification" });
       }

        //If Successful
        return res.json({ "success": true, "msg": "Captcha passed" });
      });
  });

router.post("/post", (req, res, next)=> {
  let userID = req.user[0].ID;
  return knex('Items')
  .insert(
  {
    UserID: userID,
    Title: req.body.name,
    Price: req.body.price,
    Description: req.body.descrition,
    Category: req.body.category
  })
  .then(   res.redirect("/"));
})

/*
----Post request for search bar/dropdown----
  Created by Pablo Escriva
  Persistent search by Johnny Huynh
  Reviewed by Stephanie Santana
  */
  router.post("/items-search", (req, res, next)=> {

 let string = "%"+req.body.search+"%";    //format the search sring to use with %like

 global.holdSearch = req.body.search;     //variable that keeps the last search string by user
 global.holdCategory = req.body.dropdown; //variable that keeps the last category used by user

 console.log("Searching for: " + string +" Category: "+ req.body.dropdown);

 if(req.body.dropdown == 'Select One'){   //If no category has been selected
  knex('Items')
  .join('Users', 'Items.UserID', '=', 'Users.ID')
  .where('Title', 'ilike', string)
  .where('Approved',true)
  .select('Items.Title', 'Users.username', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
  .then(function(items) {
   if(items.length == 0){
    console.log("No results (no category)");
    res.redirect('/');                    //If there is no results, we show all items
  }else{
    res.render('items',{items: items, categories: categories});
  }
});
}else{                                    //A category has been selected
  knex('Items')
  .join('Users', 'Items.UserID', '=', 'Users.ID')
  .where('Title', 'ilike', string)
  .where('Approved',true)
  .select('Items.Title', 'Users.username', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
  .where('Category', req.body.dropdown)   //Then, we filter by category
  .then(function(items) {
   if(items.length == 0){
    console.log("No results (with category)");
    res.redirect('/');                    //If there is no results, we show all items
  }else{
    res.render('items',{items: items, categories: categories});
  }
});
}

})

  module.exports = router;