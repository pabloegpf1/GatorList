const express = require('express');
let router = express.Router();


router.get("/", (req, res,next)=> {

   res.render("team")
})

router.get("/harry", (req, res,next)=> {

   res.render("about",{
      title: "Harry",
      name: "Harry Zhang",
      image_url: "https://image.ibb.co/mqsOsK/Harry_Profile.jpg"
   })
})

router.get("/jack", (req, res,next)=> {

   res.render("about",{
      title: "Jack",
      name: "Jack",
      image_url: "https://image.ibb.co/cERSKz/Profile_Jack.jpg"
   })
})

router.get("/stephanie", (req, res,next)=> {

   res.render("about",{
      title: "Stephanie",
      name: "Stephanie",
      image_url: "https://image.ibb.co/eCZQ6e/Steph_Profile.jpg"
   })
})

router.get("/marlo", (req, res,next)=> {

   res.render("about",{
      title: "Marlo",
      name: "Marlo",
      image_url: "https://image.ibb.co/d2HpXK/Profile_Marlo.jpg"
   })
})

router.get("/johnny", (req, res,next)=> {

   res.render("about",{
      title: "Johnny",
      name: "Johnny",
      image_url: "https://image.ibb.co/by37Kz/Profile_Johnny.jpg"
   })
})

router.get("/syed", (req, res,next)=> {

   res.render("about",{
      title: "Syed",
      name: "Syed",
      image_url: "https://image.ibb.co/jzqMez/Syed_Profile.jpg"
   })
})

router.get("/pablo", (req, res,next)=> {

   res.render("about",{
      title: "Pablo",
      name: "Pablo",
      image_url: "https://image.ibb.co/fB8JRe/Pablo_Profile.png"
   })
})

module.exports = router;
