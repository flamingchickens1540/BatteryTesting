const database = require("./database.js");

module.exports = {
    "/battery" : function(req, res) {
        const headers = req.headers();

        database.query(`SELECT * FROM batteries WHERE id=${headers["battery-id"]};`, (error, result, fields) => res.send(result));
    }
}