const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');

const Knex = require('knex');
const knex = Knex(require('./knexfile')[process.env.NODE_ENV || 'development'])

var expressLayouts = require('express-ejs-layouts');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/about', aboutRouter);

app.use(expressLayouts);

knex('Categories')
.insert([
   {Category: 'Home'},
   {Category: 'Books'},
   {Category: 'Electronics'},
   {Category: 'Vehicles'}])
.then();

knex('Users')
.insert(
{
  UserName: 'pabloegpf1',
  FirstName: 'Pablo',
  LastName: 'Escriva'
}
).then();


knex('Items')
.insert([
{
  Title: 'Databases book',
  UserID: '1',
  Category: 'Books',
  Image: 'https://s3.amazonaws.com/csc648team12/fundamentals-of-database-systems-for-vtu-original-imadtkg5qhb63jdz.jpeg'
},
{
  Title: 'Batteries',
  UserID: '1',
  Category: 'Electronics',
  Image: 'https://s3.amazonaws.com/csc648team12/ZOLL_batteries_530x%402x.png'
},
{
  Title: 'Chair',
  UserID: '1',
  Category: 'Home',
  Image: 'https://s3.amazonaws.com/csc648team12/MontereyChairCharcoalSHS16_1x1.jpeg'
},
{
  Title: 'TV',
  UserID: '1',
  Category: 'Electronics',
  Image: 'https://s3.amazonaws.com/csc648team12/636524900539955437-Element-RokuTV-HERO.jpg'
},
{
  Title: 'Physics book',
  UserID: '1',
  Category: 'Books',
  Image: 'https://s3.amazonaws.com/csc648team12/31-500x500.jpg'
},
{
  Title: 'Calculus book',
  UserID: '1',
  Category: 'Books',
  Image: 'https://s3.amazonaws.com/csc648team12/main-qimg-7994ee6ba77511ed9c1fa1999a6ec841-c.jpeg'
},
{
  Title: 'Table',
  UserID: '1',
  Category: 'Home',
  Image: 'https://s3.amazonaws.com/csc648team12/download.jpeg'
},
{
  Title: 'Laptop',
  UserID: '1',
  Category: 'Electronics',
  Image: 'https://s3.amazonaws.com/csc648team12/laptop.jpg'
}]
).then();

knex.migrate
.latest()
.then(() =>
  app.listen(process.env.PORT || 5000, () =>
   console.log(`Running on port ${process.env.PORT || 5000}!`)
   )
  );