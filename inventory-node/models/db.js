const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    process.exit(1); // keluar dengan pesan, bukan crash tanpa log
  }
  console.log('Connected to MySQL!');
});

module.exports = connection;
