const mysql = require('mysql2/promise');

// Cria uma conexão com o banco de dados.
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'StoreManager',
});

module.exports = connection;
