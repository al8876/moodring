require('dotenv').config();

const app = require('express')();
const http = require('http').Server(app);

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({

 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
 region: "us-west-2"
});

aws.config.update({
 region: 'us-west-2'

});

const rekognition = new aws.Rekognition();

// --------------------------------------------------------
// Initialize multers3 with our s3 config and other options
// --------------------------------------------------------

const fileName = Date.now() + '.png';

const upload = multer({
 storage: multerS3({
   s3,
   bucket: process.env.AWS_BUCKET,
   acl: 'public-read',
   metadata: (req, file, cb) => {
     cb(null, {fieldName: file.fieldname});
   },
   // Specify image name here a
   key: (req, file, cb) => {
     cb(null, fileName);
   }
 })
});

// --------------------------------------------------------
// Post to api url upload path
// --------------------------------------------------------

app.post('/upload', upload.single('photo'), (req, res, next) => {
 res.json(req.file)
 console.log('Image has been uploaded')
})

app.get('/recognize/face', (req, res, next) => {
 
 const faceParams = {
   Image: {
     S3Object: {Bucket: process.env.AWS_BUCKET, Name: req.query.key}
   },
   Attributes: ["ALL"]
 };

 rekognition.detectFaces(faceParams, function(err, data) {
   res.json({
       error: err,
       data
   });

 });
});


app.get('/recognize/environment', (req, res, next) => {
  const labelParams = {
    Image: {
      S3Object: {Bucket: process.env.AWS_BUCKET, Name: req.query.key}
    },
  };

  rekognition.detectLabels(labelParams, function(err, data) {
    res.json({
      error: err,
      data
    });

  });
 });
 
// Connect that shit ----------------------------------------------------

 let port = process.env.PORT || 3000;
http.listen(port, () => {
 console.log(`Listening on port ${port}`);
});