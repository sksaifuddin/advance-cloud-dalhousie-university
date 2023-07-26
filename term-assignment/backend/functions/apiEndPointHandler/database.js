const mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'api-builder-1.ctqeg0gnpbab.us-east-1.rds.amazonaws.com', 
    user: 'admin',
    password: 'password',
    database: 'user'
}); 
 
conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

module.exports = {
    conn
};