const express = require('express');
const router = express.Router();
const { generateDb } = require('../components/generate-db');
const { generateApiStrings } = require('../components/generate-api-strings');
const { getAllTables } = require('../components/get-all-tables');

/**
 * {
 * userId: string,
 * dbName: string,
 * columns: [
 *  {name: string, type: string (give type name according to mysql standards)}
 * ]
 * }
 */
router.post('/generate-db', async (req, res) => {
    const { userId, dbName, columns } = req.body;
    const newDatabseName = `${dbName}_${userId}`;
    const response = await generateDb(userId, newDatabseName, columns)
    res.send(response);
})

router.get('/get-api-urls/:userId/:tableName', async (req, res) => {
    const { userId, tableName } = req?.params;
    const response = generateApiStrings(userId, tableName);
    res.send(response);
})

router.get('/get-all-tables/:userId', async (req, res) => {
    const { userId } = req?.params;
    console.log('user id', userId);
    const data = await getAllTables(userId);
    console.log('final data', data);
    res.send(data);
})

module.exports = router;