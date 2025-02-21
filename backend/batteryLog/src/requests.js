const database = require("./database.js");

module.exports = {
    get : {
        "/battery" : function(req, res) {
            const query = req.query;

            database.query(`SELECT * FROM batteries WHERE id=${query["battery-id"]};`, (error, result, fields) => res.send(result[0]));
        },
        "/batteryNames" : function(req, res) {
            database.query(`SELECT name FROM batteries;`, (error, result, fields) => res.send(result.map(data => data.name)));
        }
    },
    post : {
        "/battery" : function(req, res) {
            const query = req.query;

            const body = req.body;

            console.log(body);

            database.query(`SELECT * FROM batteries WHERE id=${query["battery-id"]};`, (error, result, fields) => res.send(result[0]));
        }
    }
}