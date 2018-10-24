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

knex('Items')
.insert([
{
   Title: 'Sofa',
   userID: 'ExampleUser',
   Category: 'home',
   image: 'https://s3.amazonaws.com/csc648team12/sofa.jpeg'
},
{
   Title: 'Lamp',
   userID: 'ExampleUser2',
   Category: 'home',
   image: 'https://s3.amazonaws.com/csc648team12/lamp.jpg'
},
{
   Title: 'Software engineering book',
   userID: 'ExampleUser1',
   Category: 'books',
   image: 'https://s3.amazonaws.com/csc648team12/book.jpg'
}]
).then();

knex.migrate
.latest()
.then(() =>
 app.listen(process.env.PORT || 5000, () =>
  console.log(`Running on port ${process.env.PORT || 5000}!`)
  )
 );
