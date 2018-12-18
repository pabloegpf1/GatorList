const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt')
const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])
var aws = require('aws-sdk');
 multer = require('multer');
 multerS3 = require('multer-s3');

let categories;

// global temp variables to hold user's search query and chosen category.
global.holdSearch = "";
global.holdCategory = "All Categories";

knex("Categories").select('Category').then(function(ret){
  categories=ret;
}).then();

aws.config.update({
  secretAccessKey: 'oCHbzlfw5zpikd8zTA+Aq8V8gxjqYRFAL1Y4IBqi',
  accessKeyId: 'AKIAIFB6XVADWDUAZF4A',
  region: 'us-east-2'
});

var s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'gatorlist',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'image'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + ".png")
    }
  })
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/user-dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.post('/deleteitem',(req, res)=> {
  knex('Items')
  .where('ID','=',req.query.id)
  .del()
  .then(res.redirect('/user-dashboard'));
});

router.post('/approveitem',(req, res)=> {
  if(req.user[0].Admin == false){ //restricted to admin
    res.redirect('/');
  }else{
    knex('Items')
    .where('ID','=',req.query.id)
    .update('Approved',true)
    .then(res.redirect('/admin-dashboard'));
  }
});

router.post('/denyitem',(req, res)=> {
  if(req.user[0].Admin == false){ //restricted to admin
    res.redirect('/');
  }else{
    knex('Items')
    .where('ID','=',req.query.id)
    .del()
    .then(res.redirect('/admin-dashboard'));
  }
});

router.get("/register", (req, res)=> {
  res.render("register",{
    categories: categories,
    loggedIn: req.user != undefined
  })
})

router.post("/register", (req, res)=> {
  let hash = bcrypt.hashSync(req.body.password, 9)
  knex('Users')
  .insert({
    username: req.body.username,
    FirstName: req.body.name,
    LastName: req.body.lastname,
    password: hash
  })
  .then();
  res.redirect("/");
})

router.get("/post", (req, res)=> {
  res.render("post",{
    categories: categories,
    loggedIn: req.user != undefined,
  })
})

router.get("/login", (req, res)=> {
  res.render("login",{
    categories: categories,
    authMessage: req.flash('authMessage'),
    loggedIn: req.user != undefined,
    showBanner: false
  })
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get("/", (req, res, next)=> {
  knex("Items")
  .join('Users', 'Items.UserID', '=', 'Users.ID')
  .leftJoin('Images','Items.ID','=','ItemID')
  .groupBy('Items.ID','Users.username')
  .where('Approved',true)
  .select(knex.raw('array_agg("Link") as Images'),'Items.ID','Items.Title','Items.Description', 'Items.UserID', 'Users.username', 'Items.Category','Items.Price')
  .then(function(items) {
    res.render("items",{
      title: "Recent Items",
      items: items,
      categories: categories,
      loggedIn: req.user != undefined,
      showBanner: true
   })
  });
})

router.get("/user-dashboard", (req, res)=> {
  if(req.user==undefined){
    res.redirect('/login')
  }else{
    knex('Items')
    .join('Users', 'Items.UserID', '=', 'Users.ID')
    .leftJoin('Images','Items.ID','=','Images.ItemID')
    .groupBy('Items.ID','Users.username')
    .where('UserID', '=', req.user[0].ID)
    .select(knex.raw('array_agg("Link") as Images'),'Items.Title', 'Items.UserID', 'Users.username', 'Items.Category', 'Items.Description','Items.Price', 'Items.ID')
    .then(function(items) {
      knex('Messages')
      .join('Users','Users.ID','=', 'User_from')
      .join('Items', 'Items.UserID', '=', 'Users.ID')
      .where('User_to', '=', req.user[0].ID)
      .select('Messages.Content','Messages.User_from', 'Users.username', 'Items.Category', 'Items.Title', 'Items.Description','Items.Price','Items.ID')
      .then(function(messages) {
        res.render("user-dashboard",{
          categories: categories,
          items: items,
          messages: messages,
          loggedIn: req.user != undefined
        })
      });
    });
  }
})

router.get("/admin-dashboard", (req, res)=> {
  if(req.user==undefined){
    res.redirect('/login');
  }else if(req.user[0].Admin == false){
    res.redirect('/');
  }else{
    knex('Users')
    .select('username')
    .then(function(users) {
      knex('Items')
      .join('Users', 'Items.UserID', '=', 'Users.ID')
      .leftJoin('Images','Items.ID','=','Images.ItemID')
      .groupBy('Items.ID','Users.username')
      .select(knex.raw('array_agg("Link") as Images'),'Items.ID','Users.username', 'Items.Title','Items.UserID','Items.Category', 'Items.Description','Items.Price')
      .where('Approved',false)
      .then(function(items) {
        res.render("admin-dashboard",{
          categories: categories,
          users: users,
          items: items,
          loggedIn: req.user != undefined
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
      categories: categories,
      loggedIn: req.user != undefined
    })
  }
})

router.post("/send-message", function(req, res) {
  knex('Messages')
  .insert({
    User_from: req.user[0].ID,
    User_to: req.query.user_to,
    ItemID: req.query.item,
    Content: req.body.message_body,
  })
  .then(res.redirect("/"));
})

router.post('/register', function(req, res) {
  if (req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null) {
    return res.json({ "success": false, "msg": "Please select captcha" });
  }

  const secretKey = "6LdOF3gUAAAAAJ1UCnxqwiknDtMa1aA2uj2Db_Us";
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  request(verifyUrl, (err, response, body) => { //make request to VerifyUrl
    body = JSON.parse(body);
    if (body.success !== undefined && !body.success) {  //If Not successful
      return res.json({ "success": false, "msg": "Failed captcha verification" });
    }else{//If Successful
      return res.json({ "success": true, "msg": "Captcha passed" });
    }
  });
  res.redirect("/");
});

router.post("/post", upload.array('image', 4), async (req, res, next)=> {
  try{
    if(req.user == undefined){
      res.redirect("/login")
    }
    let userID = req.user[0].ID;

    const item = await knex('Items').insert({
      UserID: userID,
      Title: req.body.name,
      Price: req.body.price,
      Description: req.body.description,
      Category: req.body.category
    }).returning('ID')

    itemId = item[0]

    req.files.forEach(async file => {
      await knex('Images').insert({
        ItemID: itemId,
        Link: file.location
      })
    })

    res.redirect("/")
  } catch(err) {
    console.log(err);
  }
})

/*
----Post request for search bar/dropdown----
  Created by Pablo Escriva
  Persistent search by Johnny Huynh
  Reviewed by Stephanie Santana
*/

router.post("/items-search", (req, res, next)=> {

  global.holdSearch = req.body.search.replace(/[^A-Za-z0-9]/g, '');// keeps the last search string + field validation
  global.holdCategory = req.body.dropdown; // keeps the last category used by user

  if(req.body.dropdown == 'Select One'){// If no category has been selected
    knex('Items')
    .join('Users', 'Items.UserID', '=', 'Users.ID')
    .where('Title', 'ilike', "%"+holdSearch+"%")
    .leftJoin('Images','Items.ID','=','ItemID')
    .groupBy('Items.ID','Users.username')
    .where('Approved',true)
    .select(knex.raw('array_agg("Link") as Images'),'Items.ID','Items.Title','Items.UserID', 'Users.username', 'Items.Category', 'Items.Description','Items.Price')
    .then(function(items) {
     if(items.length == 0){
      res.redirect('/');// If there is no results, we show all items
    }else{
      res.render('items',{
        title: "Search results",
        items: items,
        categories: categories,
        loggedIn: req.user != undefined,
        showBanner: false
      });
    }
  });
  }else{//A category has been selected
    knex('Items')
    .join('Users', 'Items.UserID', '=', 'Users.ID')
    .where('Title', 'ilike', "%"+holdSearch+"%")// replaced var string with holdSearch here
    .leftJoin('Images','Items.ID','=','ItemID')
    .groupBy('Items.ID','Users.username')
    .where('Approved',true)
    .select(knex.raw('array_agg("Link") as Images'),'Items.ID','Items.Title','Items.UserID', 'Users.username', 'Items.Category', 'Items.Description','Items.Price')
    .where('Category', req.body.dropdown)// Then, we filter by category
    .then(function(items) {
     if(items.length == 0){
      res.redirect('/');// If there is no results, we show all items
    }else{
      res.render('items',{
        title: "Search results",
        items: items,
        categories: categories,
        loggedIn: req.user != undefined,
        showBanner: false
      });
    }
  });
  }
})

module.exports = router;