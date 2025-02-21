const mysql = require('mysql2');

const connection = mysql.createConnection({
  host : "localhost",
  user : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE,
  path : process.env.PATH
});
 
connection.connect();
 
module.exports = {
    query : connection.query
};