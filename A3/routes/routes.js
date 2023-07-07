const express = require('express');

const router = express.Router()
const db = require('../database');

router.post('/store-products', (req, res) => {
    console.log(req.body);
    const sql = "INSERT INTO products (name, price, availability) VALUES ('test', 'test', true)";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('result', result);
        console.log("1 record inserted");
    });
    
    return res.send("hello world");
});

module.exports = router;