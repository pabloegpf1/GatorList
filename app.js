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

app.listen(process.env.PORT || 3000, ()=> {

	console.log("Server Running")
})
