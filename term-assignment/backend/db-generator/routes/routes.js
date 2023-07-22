const express = require('express');
const router = express.Router();
const { generateDb } = require('../components/generate-db');

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
    const newDatabseName = `${userId}_${dbName}`;
    const response = await generateDb(userId, newDatabseName, columns)
    res.send(response);
})

module.exports = router;