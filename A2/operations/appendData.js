const { BUCKET_NAME, FILE_NAME } = require('./../constants/constants');
// const fs = require('fs');

function appendDataOperation(s3, fileMessage) {
    return new Promise((resolve, reject) => {
        const downloadParams = {
            Bucket: BUCKET_NAME,
            Key: FILE_NAME
        }
    
        s3.getObject(downloadParams, function(err, data) {
            if (err) {
              console.error('Error downloading file:', err);
            } else {
              const existingFileData = data.Body.toString();
              const modifiedFileData = existingFileData + fileMessage;
          
              const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: FILE_NAME,
                Body: modifiedFileData
              };
          
              s3.upload(uploadParams, function(err, data) {
                if (err) {
                  console.error('Error uploading file:', err);
                } else {
                  console.log('File uploaded successfully. Location:', data.Location);
                  resolve(data.Location);
                }
              });
            }
          });
    })
}

module.exports = {
    appendDataOperation: appendDataOperation
}