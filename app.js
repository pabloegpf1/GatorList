const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
var request = require('request');


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

var aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'oCHbzlfw5zpikd8zTA+Aq8V8gxjqYRFAL1Y4IBqi',
    accessKeyId: 'AKIAIFB6XVADWDUAZF4A',
    region: 'us-east-2'
});

var s3 = new aws.S3();


const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'gatorlist',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'image'});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + ".png")
      }
    })
  })


app.post('/upload', upload.single('image'), (req, res)=> {

        let imageLink = req.file.location 
        console.log(imageLink);
        
        return res.json({'imageUrl': req.file.location});
})



knex.migrate
.latest()
.then(() =>
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Running on port ${process.env.PORT || 5000}!`)
    )
  );