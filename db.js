const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "drinks",
});

conn.connect((err) => {
  if (err) console.log(err);
  if (!err) {
    console.log("connected to databases ");
  }
});

module.exports = { conn };
