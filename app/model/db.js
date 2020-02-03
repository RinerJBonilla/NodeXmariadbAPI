var mysql = require("mariadb");
const dotenv = require("dotenv");

dotenv.config();

const conn = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

module.exports = conn;
