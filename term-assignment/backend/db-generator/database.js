const mysql = require("mysql");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

// Function to retrieve the database credentials from AWS Secrets Manager
const getDatabaseCredentials = async () => {
  const secretsManagerClient = new SecretsManagerClient({
    region: "us-east-1",
  }); // Replace with your desired region
  const secretName = "APIBuilderSecret"; // Replace with your secret name

  const command = new GetSecretValueCommand({ SecretId: secretName });

  try {
    const data = await secretsManagerClient.send(command);
    if ("SecretString" in data) {
      const secretString = data.SecretString;
      const { user, password, host, database } = JSON.parse(secretString);
      return {
        user,
        password,
        host,
        database,
      };
    } else {
      throw new Error("SecretString not found in the response");
    }
  } catch (err) {
    console.error(
      "Error retrieving database credentials from Secrets Manager:",
      err
    );
    throw err;
  }
};

// Function to establish the database connection
const connectToDatabase = async () => {
//   const { user, password, host, database } = await getDatabaseCredentials();
  const conn = mysql.createConnection(await getDatabaseCredentials());

  conn.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      throw err;
    }
    console.log("Database is connected successfully !");
  });

  return conn;
};

module.exports = {
  connectToDatabase,
};
