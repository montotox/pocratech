var mysql = require("mysql");
require("dotenv").config({ path: __dirname + "/.env" });

// var connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pokemon",
});
connection.connect((error) => {
  if (error) throw error;
  console.log("conexion correcta");
});
module.exports = connection;
