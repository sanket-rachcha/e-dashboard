// Load the MySQL library
const mysql = require('mysql');

// Create a connection to your MySQL database
const connection = mysql.createConnection({
    host: 'localhost',      // Replace with your database host
    user: 'root',           // Replace with your database user
    password: '',   // Replace with your database password
    database: 'e-comm' // Replace with your database name if needed
});

connection.connect((err) => {
    if (err) {
        console.log('error in connection')
    }
})

module.exports =connection;