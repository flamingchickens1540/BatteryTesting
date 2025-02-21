const mysql = require('mysql2');

const connection = mysql.createConnection({
  host : "localhost",
  user : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
 
connection.connect();
 
module.exports = {
  query : function(query, success) {
    return new Promise(res => database.query(query, (error, result) => {
      if(error) return res(error);

      res(success(result));
    }));
  }
};