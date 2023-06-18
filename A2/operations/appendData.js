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
              reject(err);
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
                  reject(err);
                } else {
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