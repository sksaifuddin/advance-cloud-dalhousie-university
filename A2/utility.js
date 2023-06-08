function createBucket(s3, bucketName) {
  return new Promise((resolve, reject) => {
    var bucketParams = {
      Bucket: bucketName,
    };

    // call S3 to create the bucket
    s3.createBucket(bucketParams, function (err, data) {
      if (err) {
        reject("Error", err);
      } else {
        console.log("data from s3", data);
        resolve(data.Location);
      }
    });
  });
}

module.exports = {
  createBucket: createBucket,
};
