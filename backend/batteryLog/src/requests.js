const database = require("./database.js");

module.exports = {
    "/battery" : function(req, res) {
        const query = req.query;

        database.query(`SELECT * FROM batteries WHERE id=${query["battery-id"]}`, (error, result, fields) => res.send(result));
    }
}