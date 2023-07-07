const express = require('express');

const router = express.Router()
const db = require('../database');

router.post('/store-products', (req, res) => {
    console.log(req.body);
    const body = req.body.products;
    const sql = "INSERT INTO products (name, price, availability) VALUES ?";
    const items = body.map(obj => Object.values(obj))
    db.query(sql,[items], function (err, result) {
        if (err) throw err;
        console.log('result', result);
        console.log("1 record inserted");
        res.send({ 
                message: "Success."
            });
    });
});

router.get("/list-products", (req, res) => {
    db.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        res.send({
            products: result
        })
      });
})

module.exports = router;