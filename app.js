const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const Knex = require('knex');
const knex = Knex(require('./knexfile')[process.env.NODE_ENV || 'staging'])

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/about', aboutRouter);

knex.schema.raw('DELETE FROM "Items"').then();
knex.schema.raw('DELETE FROM "Categories"').then();


knex('Categories')
.insert([
   {Category: 'Home'},
   {Category: 'Books'},
   {Category: 'Electronics'},
   {Category: 'Vehicles'}])
.then();

knex('Items')
.insert([
{
  Title: 'Databases book',
  userID: 'ExampleUser3',
  Category: 'Books',
  image: 'https://s3.amazonaws.com/csc648team12/fundamentals-of-database-systems-for-vtu-original-imadtkg5qhb63jdz.jpeg'
},
{
  Title: 'Batteries',
  userID: 'ExampleUser4',
  Category: 'Electronics',
  image: 'https://s3.amazonaws.com/csc648team12/ZOLL_batteries_530x%402x.png'
},
{
  Title: 'Chair',
  userID: 'ExampleUser5',
  Category: 'Home',
  image: 'https://s3.amazonaws.com/csc648team12/MontereyChairCharcoalSHS16_1x1.jpeg'
},
{
  Title: 'TV',
  userID: 'ExampleUser6',
  Category: 'Electronics',
  image: 'https://s3.amazonaws.com/csc648team12/636524900539955437-Element-RokuTV-HERO.jpg'
},
{
  Title: 'Physics book',
  userID: 'ExampleUser7',
  Category: 'Books',
  image: 'https://s3.amazonaws.com/csc648team12/31-500x500.jpg'
},
{
  Title: 'Calculus book',
  userID: 'ExampleUser8',
  Category: 'Books',
  image: 'https://s3.amazonaws.com/csc648team12/main-qimg-7994ee6ba77511ed9c1fa1999a6ec841-c.jpeg'
},
{
  Title: 'Table',
  userID: 'ExampleUser9',
  Category: 'Home',
  image: 'https://s3.amazonaws.com/csc648team12/download.jpeg'
},
{
  Title: 'Laptop',
  userID: 'ExampleUser10',
  Category: 'Electronics',
  image: 'https://s3.amazonaws.com/csc648team12/laptop.jpg'
}]
).then();

knex.migrate
.latest()
.then(() =>
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Running on port ${process.env.PORT || 5000}!`)
    )
  );
