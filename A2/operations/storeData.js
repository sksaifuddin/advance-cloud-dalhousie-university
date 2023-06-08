const utility = require('../utility');
// const fs = require('fs');
const { BUCKET_NAME, FILE_NAME } = require('./../constants/constants');

function storeDataOperation(s3, fileMessage) {
    return new Promise((resolve, reject) => {
        utility.createBucket(s3, BUCKET_NAME).then(() => {
            const uploadParams = {
                Bucket: BUCKET_NAME, // Bucket into which you want to upload file
                Key: FILE_NAME, // Name by which you want to save it
                Body: fileMessage // Local file 
            };
            s3.upload(uploadParams, function(err, data) {
                if(data) {
                    console.log('in upload');
                    resolve(data.Location);
                }
            })
        })
    }) 
}

function makeBucketPublic(s3) {
    return new Promise((resolve, reject) => {
        const blockPublicAccessParams = {
            Bucket: BUCKET_NAME,
            PublicAccessBlockConfiguration: {
              BlockPublicAcls: false,
              IgnorePublicAcls: false,
              BlockPublicPolicy: false,
              RestrictPublicBuckets: false
            }
          };

          s3.putPublicAccessBlock(blockPublicAccessParams, function(err, data) {
            if (err) {
              console.error('Error disabling block public access:', err);
            } else {
              console.log('Block public access disabled. Modifying bucket policy...');
          
              // Set up the bucket policy to allow public read access
              const publicAccessPolicy = {
                Version: '2012-10-17',
                Statement: [
                  {
                    Sid: 'PublicRead',
                    Effect: 'Allow',
                    Principal: '*',
                    Action: 's3:GetObject',
                    Resource: `arn:aws:s3:::${BUCKET_NAME}/*`
                  }
                ]
              };
          
              // Convert the policy to a JSON string
              const policyString = JSON.stringify(publicAccessPolicy);
          
              // Set the bucket policy
              const bucketPolicyParams = {
                Bucket: BUCKET_NAME,
                Policy: policyString
              };
          
              s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
                if (err) {
                  console.error('Error making the bucket public:', err);
                } else {
                  console.log('Bucket is now public.');
                  resolve(data);
                }
              });
            }
          });
          
       
    })
}

module.exports = {
    storeDataOperation: storeDataOperation,
    makeBucketPublic: makeBucketPublic
}