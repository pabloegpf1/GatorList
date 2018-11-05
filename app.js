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

knex.migrate
.latest()
.then(() =>
  app.listen(process.env.PORT || 5001, () =>

    console.log(`Running on port ${process.env.PORT || 5001}!`)
    )
  );

