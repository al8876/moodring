// /**TODO:
//  * 1. two cups, toast up w/ the gang
//  * 2. from food stamps to a whole 'nother domain
//  * 
//  * - GRAB PICTURE FROM CAMERA COMPONENT
//  * - ADJUST METADATA FOR THE PURPOSE OF NAMING CONVENTION
//  * - UPLOAD TO S3
//  * - ANALYZE WITH S3
//  * - PASS ON TO SPOTIFY API
// */

// Load the SDK and UUID
require('dotenv').config()
const aws = require('aws-sdk');

// .env contains AWS keys, update region (us-west-1 by default)

// AWS.config.update({ 
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'us-west-2'
// });

// Create an S3 client

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2"
});

aws.config.update({region: 'us-west-2'})

// AWS Rekognition, my dudes

const rekognition = new aws.Rekognition()

// Placeholder params to 'query' a specific image based on name
// Would be a good idea to have a naming convention to save images

const faceParams = {
  Image: {
     S3Object: {
     Bucket: process.env.AWS_BUCKET, 
     Name: 'THESADGIRL.jpg'
    }
   },
  };

  const labelParams = {
    Image: {
       S3Object: {
       Bucket: process.env.AWS_BUCKET, 
       Name: 'THESADGIRL.jpg'
      }
     },
    
    };
    faceParams.Attributes = ["ALL"];

// Detect some faces, my dudes 

let faces = new Promise((resolve, reject) => {
  rekognition.detectFaces(faceParams, function(err, data) {
    if (err) 
      reject(err);
    else     
      resolve(data);
  });
});


let labels = new Promise((resolve, reject) => {
  rekognition.detectLabels(labelParams, function(err, data) {
    if (err) 
      reject(err);
    else     
      resolve(data);
  });
});

// // OUTPUT ------------------------------------------
// // ---------------- SO EMOTIONAL -------------------
// [ { Type: 'SAD', Confidence: 22.012407302856445 },
//   { Type: 'CONFUSED', Confidence: 6.585508346557617 },
//   { Type: 'CALM', Confidence: 5.396681785583496 } ]
// // --------------- DON'T LABEL ME ------------------
// [ { Name: 'Human', Confidence: 99.18289947509766 },
//   { Name: 'People', Confidence: 99.1828842163086 },
//   { Name: 'Person', Confidence: 99.18289947509766 },
//   { Name: 'Face', Confidence: 89.77628326416016 },
//   { Name: 'Portrait', Confidence: 89.77628326416016 },
//   { Name: 'Female', Confidence: 72.7052001953125 },
//   { Name: 'Lady', Confidence: 62.089908599853516 },
//   { Name: 'Woman', Confidence: 62.089908599853516 },
//   { Name: 'Dimples', Confidence: 57.91385269165039 },
//   { Name: 'Head', Confidence: 54.233299255371094 },
//   { Name: 'Sunglasses', Confidence: 50.551448822021484 } ]

Promise.all([faces, labels]).then(value => {
  let faces = value[0]
  let labels = value[1]
  console.log('---------------- SO EMOTIONAL -------------------')
  console.log(faces.FaceDetails[0].Emotions)
  console.log('--------------- DON\'T LABEL ME ------------------')
  console.log(labels.Labels)

});