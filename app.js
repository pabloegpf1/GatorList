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




/* aws s3 upload */

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


// test using upload.ejs or POSTMAN 'image' is the key for upload


app.post('/upload', upload.single('image'), (req, res, next) => {

  let fileURL = req.file.location // url to upload to database form aws s3


       res.send(JSON.stringify({fileUrl: fileURL))
})





/*   */

app.post('/register', function(req, res) {
    if (req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null) {
        return res.json({ "success": false, "msg": "Please select captcha" });

    }
    //const key
    const secretKey = "6LdOF3gUAAAAAJ1UCnxqwiknDtMa1aA2uj2Db_Us";

    //verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    //make request to VerifyUrl
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);

        //If Not successful
        if (body.success !== undefined && !body.success) {
            return res.json({ "success": false, "msg": "Failed captcha verification" });
        }

        //If Successful
        return res.json({ "success": true, "msg": "Captcha passed" });
    });
});

knex.migrate
    .latest()
    .then(() =>
        app.listen(process.env.PORT || 5000, () =>
            console.log(`Running on port ${process.env.PORT || 5000}!`)
        )
    );