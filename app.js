const express = require("express");

const app = express();

app.set("view engine", "ejs");


app.get("/", (req, res)=> {

	res.render("index")
})

app.get("/index.html", (req, res)=> {

	res.render("index")
})

app.get("/aboutStephanie.html", (req, res)=> {

	res.render("aboutStephanie")
})

app.get("/aboutPablo.html", (req, res)=> {

	res.render("aboutPablo")
})

app.get("/aboutJohnny.html", (req, res)=> {

	res.render("aboutJohnny")
})

app.get("/aboutSyed.html", (req, res)=> {

	res.render("aboutSyed")
})

app.get("/aboutJack.html", (req, res)=> {

	res.render("aboutJack")
})

app.get("/aboutMarlo.html", (req, res)=> {

	res.render("aboutMarlo")
})

app.get("/aboutHarry.html", (req, res)=> {

	res.render("aboutHarry")
})
app.listen(process.env.PORT || 3000, ()=> {

	console.log("Server Running")
})
