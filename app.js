const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index2');
const aboutRouter = require('./routes/about');
const Knex = require('knex');
const knex = Knex(require('./knexfile')[process.env.NODE_ENV || 'production'])

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/about', aboutRouter);

knex.migrate
.latest()
.then(() =>
 app.listen(process.env.PORT || 5000, () =>
  console.log(`Running on port ${process.env.PORT || 5000}!`)
  )
 );
