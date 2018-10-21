const express = require('express');
let router = express.Router();

router.get("/", (req, res, next)=> {

   res.render("index");

})

router.post("/newUser", (req, res, next)=> {

   res.render("index");

   console.log('Username: ' + req.body.username);
   console.log('Password: ' + req.body.password);
})

router.get("/register", (req, res)=> {

   res.render("register")
})


module.exports = router;
