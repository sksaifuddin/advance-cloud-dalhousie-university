const db = require("../database");
const { v4: uuid } = require("uuid");

const generateDb = async (userId, dbName, columns) => {
  const res = await createNewUserTable(dbName, columns);
  await insertDBdetails(userId, dbName);
  return res;
};

const createNewUserTable = (dbName, columns) => {
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

const insertDBdetails = (dbName, userId) => {
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

module.exports = {
  generateDb,
};
