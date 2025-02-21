const database = require("./database.js");
const ID_RANGE = 500;

function queryBattery(batteryId) {
    return new Promise(res => {
        database.query(`SELECT * FROM batteries WHERE id=${batteryId};`, (error, result, fields) => {
            if (error) return res(error);

            res(result[0])
        });
    });
}

function queryAddBattery(id, name, date) {
    return new Promise(res => {
        database.query(`INSERT INTO batteries VALUES(${id}, "${name}", DATE("${date}"), NULL, NULL)`, (error, result, fields) => {
            if (error) return res(error);

            res("Success");
        });
    });
}

function queryBatteryNames() {
    return new Promise(res => {
        database.query(`SELECT name FROM batteries;`, (error, result, fields) => {
            if (error) return res(error);

            res(result.map(data => data.name));
        });
    });
}

function queryBatteryIds() {
    return new Promise(res => {
        database.query(`SELECT id FROM batteries;`, (error, result, fields) => {
            if (error) return res(error);

            res(result.map(data => data.id));
        });
    });
}

module.exports = {
    get : {
        "/battery" : async req => await queryBattery(req.query["battery-id"]),
        "/batteryNames" : queryBatteryNames
    },
    post : {
        "/battery" : async req => {
            const ids = await queryBatteryIds();

            let id;
 
            do {
                id = Math.floor(Math.random() * ID_RANGE);
            } while(ids.includes(id));

            const body = req.body;

            return await queryAddBattery(id, body.batteryName, body.batteryDate);
        }
    }
}