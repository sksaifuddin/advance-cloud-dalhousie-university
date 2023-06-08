const { BUCKET_NAME, FILE_NAME } = require('./../constants/constants');

function deleteFileOperation(s3, uri) {
    const deleteParams = {
        Bucket: BUCKET_NAME,
        Key: FILE_NAME
      };
    return new Promise((resolve, reject) => {
        s3.deleteObject(deleteParams, function(err, data) {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted successfully.');
              resolve(data);
            }
          });
    })
}

module.exports = {
    deleteFileOperation: deleteFileOperation
}