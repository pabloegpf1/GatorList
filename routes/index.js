const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt')

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

let categories;

// global temp variables to hold user's search query and chosen category.
// may be used throughout all js and ejs files
global.holdSearch = "";
global.holdCategory = "All Categories";

knex("Categories").select('Category').then(function(ret){
  categories=ret;
}).then();

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/user-dashboard',
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

  let hash = bcrypt.hashSync(req.body.password, 9)

  knex('Users')
  .insert(
  {
    username: req.body.username,
    FirstName: req.body.name,
    LastName: req.body.lastname,
    password: hash
  })
  .then();
  res.redirect("/")
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

/*Logout handled with Passport, created by Harry Zhang*/
router.get("/logout", (req, res)=> {

  req.logout();
  req.session.destroy();
  res.redirect('/');
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

router.get("/user-dashboard", (req, res)=> {
  if(req.user==undefined){
    res.redirect('/login')
  }else{
    knex('Items')
    .join('Users', 'Items.UserID', '=', 'Users.ID')
    .where('UserID', '=', req.user[0].ID)
    .select('Items.Title', 'Items.UserID', 'Users.username', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
    .then(function(items) {
      knex('Messages')
      .join('Users','Users.ID','=', 'User_to')
      .join('Items', 'Items.UserID', '=', 'Users.ID')
      .where('User_to', '=', req.user[0].ID)
      //.where('ItemID', '=', 'Items.ID')
      .select('Messages.Content','Messages.User_from', 'Users.username', 'Items.Category', 'Items.Title', 'Items.Image', 'Items.Description','Items.Price','Items.ID')
      .then(function(messages) {
        res.render("user-dashboard",{
          categories: categories,
          items: items,
          messages: messages
        })
      });
    });
  }
})

router.get("/admin-dashboard", (req, res)=> {
  if(req.user==undefined || req.user[0].admin == true){
    res.redirect('/login')
  }else{
    knex('Users')
    .select('username')
    .then(function(users) {
      knex('Items')
      .join('Users', 'Items.UserID', '=', 'Users.ID')
      .where('Approved',false)
      .then(function(items) {
        res.render("admin-dashboard",{
          categories: categories,
          users: users,
          items: items
        })
      });
    });
  }
})

router.get("/send-message", (req, res)=> {
  if(req.user==undefined){
    res.redirect('/login')
  }else{
    res.render("message-form",{
      user_from: req.user[0].username,
      user_from_id: req.user[0].ID,
      user_to: req.query.to_id,
      username_to: req.query.username,
      item_title: req.query.item,
      item_id: req.query.item_id,
      categories: categories
    })
  }
})

router.post("/send-message", (req, res)=> {

})

router.post('/register', function(req, res) {
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
  .then(res.redirect("/"));
})


/*
----Post request for search bar/dropdown----
  Created by Pablo Escriva
  Persistent search by Johnny Huynh
  Reviewed by Stephanie Santana
  */
router.post("/items-search", (req, res, next)=> {

  global.holdSearch = req.body.search.replace(/[^A-Za-z0-9]/g, '');
  // variable that keeps the last search string by user
  // also removes all non alpha-numerics from string to prevent injection scenarios

  global.holdCategory = req.body.dropdown; //variable that keeps the last category used by user

  // let string = "%"+holdSearch+"%";    //format the search sring to use with %like
  // removed string since holdSearch is basically the same thing now

  console.log("Searching for: " + holdSearch +" Category: "+ req.body.dropdown);

  if(req.body.dropdown == 'Select One'){   //If no category has been selected
    knex('Items')
    .join('Users', 'Items.UserID', '=', 'Users.ID')
    .where('Title', 'ilike', "%"+holdSearch+"%") // replaced var string with holdSearch here
    .where('Approved',true)
    .select('Items.Title','Items.UserID', 'Users.username', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
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
    .where('Title', 'ilike', "%"+holdSearch+"%") // replaced var string with holdSearch here
    .where('Approved',true)
    .select('Items.Title','Items.UserID', 'Users.username', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
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