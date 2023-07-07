var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'private-database-1-instance-1.ctqeg0gnpbab.us-east-1.rds.amazonaws.com', 
    user: 'admin',
    password: 'password',
    database: 'products'
}); 
 
conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

module.exports = conn;