const crypto = require('crypto');
const https = require('https');
const bcrypt = require('bcryptjs');

const hashValue = (data, algorithm) => {
  return crypto.createHash(algorithm).update(data, 'utf8').digest('hex');
};

module.exports.sha256Hash = async (event) => {
  const { value, course_uri } = event;
  const hashedValue = await hashValue(value, 'sha256');

  return {
    statusCode: 200,
    body: {
      banner: 'B00934531',
      result: hashedValue,
      arn: "arn:aws:lambda:us-east-1:185231447271:function:hashing-service-dev-sha256Hash",
      action: 'sha256',
      value: value,
      course_uri
    },
  };
};

module.exports.md5Hash = async (event) => {
  const { value, course_uri } = event;

  const hashedValue = await hashValue(value, 'md5');

  return {
    statusCode: 200,
    body: {
      banner: 'B00934531',
      result: hashedValue,
      arn: "arn:aws:lambda:us-east-1:185231447271:function:hashing-service-dev-md5Hash",
      action: 'md5',
      value: value,
      course_uri
    },
  };
};

const bcryptHashing = (text) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, 12, function(err, hash) {
      // Store hash in your password DB.
      resolve(hash.toString());
      if(err) {
        console.log('error in the bycrutptin hash function', err);
        reject(err);
      }
    });
  })
}

module.exports.bcryptHash = async (event) => {
  const { value, course_uri } = event;
  const hashedValue = await bcryptHashing(value);

  return {
    statusCode: 200,
    body: {
      banner: 'B00934531',
      result: hashedValue,
      arn: "arn:aws:lambda:us-east-1:185231447271:function:hashing-service-dev-bcryptHash",
      action: 'bcrypt',
      value: value,
      course_uri
    },
  };
};


const sendPostRequest = (url, requestBody) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(url, options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(responseBody);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify(requestBody));
    req.end();
  });
};

module.exports.postToUrl = async (event) => {
  const {course_uri, ...eventObj} = event.body;

  try {
    const response = await sendPostRequest(course_uri, eventObj);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'POST request to URL successful.' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error making POST request.' }),
    };
  }
};