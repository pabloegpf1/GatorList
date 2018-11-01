const express = require('express');
let router = express.Router();

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

let categories;
knex("Categories").select('Category').then(function(ret){
  categories=ret;
}).then();


router.get("/", (req, res,next)=> {

   res.render("team",{categories: categories})
})

router.get("/harry", (req, res,next)=> {

   res.render("about",{
      title: "Harry",
      name: "Harry Zhang",
      image_url: "https://image.ibb.co/mqsOsK/Harry_Profile.jpg",
      categories: categories
   })
})

router.get("/jack", (req, res,next)=> {

   res.render("about",{
      title: "Jack",
      name: "Jack",
      image_url: "https://image.ibb.co/cERSKz/Profile_Jack.jpg",
      categories: categories
   })
})

router.get("/stephanie", (req, res,next)=> {

   res.render("about",{
      title: "Stephanie",
      name: "Stephanie",
      image_url: "https://image.ibb.co/eCZQ6e/Steph_Profile.jpg",
      categories: categories
   })
})

router.get("/marlo", (req, res,next)=> {

   res.render("about",{
      title: "Marlo",
      name: "Marlo",
      image_url: "https://image.ibb.co/d2HpXK/Profile_Marlo.jpg",
      categories: categories
   })
})

router.get("/johnny", (req, res,next)=> {

   res.render("about",{
      title: "Johnny",
      name: "Johnny",
      image_url: "https://image.ibb.co/by37Kz/Profile_Johnny.jpg",
      categories: categories
   })
})

router.get("/syed", (req, res,next)=> {

   res.render("about",{
      title: "Syed",
      name: "Syed",
      image_url: "https://image.ibb.co/jzqMez/Syed_Profile.jpg",
      categories: categories
   })
})

router.get("/pablo", (req, res,next)=> {

   res.render("about",{
      title: "Pablo",
      name: "Pablo",
      image_url: "https://image.ibb.co/fB8JRe/Pablo_Profile.png",
      categories: categories
   })
})


module.exports = router;