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
  passport.authenticate('local', { successRedirect: '/',
   failureRedirect: '/login',
   failureFlash: true })
  );

router.get("/register", (req, res)=> {

 res.render("register",{
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
})

router.get("/", (req, res, next)=> {

 knex("Items")
 .join('Users', 'Items.UserID', '=', 'Users.ID')
 .select('Items.Title', 'Users.username', 'Items.Category', 'Items.Image', 'Items.Description','Items.Price')
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
  username: req.body.username,
  FirstName: req.body.name,
  LastName: req.body.lastname,
  password: req.body.password
})
 .then(   res.redirect("/"));
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
    console.log("No results (no category)");
    res.redirect('/');
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
    console.log("No results (with category)");
    res.redirect('/');
  }else{
    res.render('items',{items: items, categories: categories});
  }
});
}

})

module.exports = router;