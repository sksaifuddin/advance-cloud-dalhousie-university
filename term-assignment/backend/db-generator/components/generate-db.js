const { connectToDatabase, getSecretsFromManager } = require("../database");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

const generateDb = async (userId, dbName, columns) => {
  const res = await createNewUserTable(dbName, columns);
  await insertDBdetails(dbName, userId);
  const { secretkey } =  await getSecretsFromManager();
  const token = generateJWTToken(dbName, userId, secretkey);
  console.log('token', token);
  return res;
};

const createNewUserTable = async (dbName, columns) => {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    const columnsWithId = [{ name: "id", type: "VARCHAR" }, ...columns];
    const columnStrings = columnsWithId.map(
      (column) =>
        `${column.name} ${
          column.type === "VARCHAR" ? "VARCHAR(255)" : column.type
        }`
    );
    const sql = `CREATE TABLE ${dbName} (${columnStrings.join(", ")})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      resolve({
        statusCode: 200,
        body: result,
        message: `${dbName} database created`,
      });
    });
  });
};

const insertDBdetails = async (dbName, userId) => {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users_databases 
            (database_id, database_name, user_id) 
            VALUES ('${uuid()}', '${dbName}', '${userId}')`,
      (err, res) => {
        if (err) throw err;
        resolve(res);
      }
    );
  });
};

const generateJWTToken = (dbName, userId, secretkey) => {
  const payload = { dbName, userId };
  return jwt.sign(payload, secretkey, { expiresIn: "1h" });
};

module.exports = {
  generateDb,
};
