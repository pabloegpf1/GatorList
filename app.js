const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var User = require('./models/user');
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.set("view engine", "ejs");

const Sequelize = require('sequelize');

const sequelize = new Sequelize('d9i5vj00kei9ml', 'fjncbkvtfeudms', '9cf011343f162ec0a08d589d26432061144a6ccf9fb86b906d274b7bf11c608d', {
  host: 'ec2-54-83-37-223.compute-1.amazonaws.com',
  dialect: 'postgres',
  dialectOptions:{
    ssl: true
  },
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

app.use('/', indexRouter);
app.use('/about', aboutRouter);

app.post('/newUser',function(req,res){
 var username = req.body.username;
 var password = req.body.password;
 console.log(username + password);
 //we insert row in user table here
 res.render("index");
});


app.listen(process.env.PORT || 3000, ()=> {

	console.log("Server Running")
})
