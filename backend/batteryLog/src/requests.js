const database = require("./database.js");

function queryBattery(batteryId) {
    return new Promise(res => {
        database.query(`SELECT * FROM batteries WHERE id=${batteryId};`, (error, result, fields) => res(result[0]));
    });
}

function queryBatteryNames() {
    return new Promise(res => {
        database.query(`SELECT name FROM batteries;`, (error, result, fields) => res(result.map(data => data.name)));
    });
}

module.exports = {
    get : {
        "/battery" : async (req, res) => res.send(await queryBattery(req.query["battery-id"])),
        "/batteryNames" : async (req, res) => res.send(await queryBatteryNames())
    },
    post : {
    }
}