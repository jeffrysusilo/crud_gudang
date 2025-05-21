const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'inventory',
  port: process.env.MYSQLPORT || 3306
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = connection;
