const database = require("../database.js");

const BATTERIES_TABLES = "batteries";

function getBattery(batteryId) {
    return new Promise(res => {
        database.query(`SELECT * FROM ${BATTERIES_TABLES} WHERE id=${batteryId};`, (error, result, fields) => {
            if (error) {
                console.error(error);
                return res(undefined);
            }

            res(result[0])
        });
    });
}

function addBattery(id, name, date) {
    return new Promise(res => {
        database.query(`INSERT INTO ${BATTERIES_TABLES} VALUES(${id}, "${name}", DATE("${date}"), NULL, NULL);`, (error, result, fields) => {
            if (error)
                return res(error);

            res(id);
        });
    });
}

function getBatteries() {
    return new Promise(res => {
        database.query(`SELECT id, name, capacity FROM ${BATTERIES_TABLES};`, (error, result, fields) => {
            if (error) {
                console.error(error);
                return res(undefined);
            }

            res(result);
        });
    });
}

function getBatteryIds() {
    return new Promise(res => {
        database.query(`SELECT id FROM ${BATTERIES_TABLES};`, (error, result, fields) => {
            if (error) {
                console.error(error);
                return res(undefined);
            }

            res(result.map(data => data.id));
        });
    });
}

function setCapacity(id, capacity) {
    return new Promise(res => {
        database.query(`UPDATE ${BATTERIES_TABLES} SET capacity = ${capacity} WHERE id = ${id}`, (error, result, fields) => {
            if (error) {
                console.error(error);
                return res(undefined);
            }

            res("Success");
        });
    });
}

module.exports = {
    getBattery,
    addBattery,
    getBatteries,
    getBatteryIds,
    setCapacity
};