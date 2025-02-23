const mysql = require('mysql2');

const connection = mysql.createConnection({
  host : "localhost",
  user : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
 
connection.connect();
 
module.exports = {
  /**
   * @deprecated
   */
  query : function(query, success) {
    return new Promise(res => connection.query(query, (error, result) => {
      if(error) return res(error);

      res(success(result));
    }));
  },
  execute : function(query, userInput, success) {
    return new Promise(res => connection.execute(query, userInput, (error, result) => {
      if(error) return res(error);

      res(success(result));
    }));
  }
};