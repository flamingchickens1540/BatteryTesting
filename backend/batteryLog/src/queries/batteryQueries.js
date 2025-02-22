const database = require("../database.js");

const BATTERIES_TABLES = "Batteries";

function getBattery(batteryId) {
    return database.query(`SELECT * FROM ${BATTERIES_TABLES} WHERE id=${batteryId};`, result => result[0]);
}

function addBattery(id, name, date) {
    return database.query(`INSERT INTO ${BATTERIES_TABLES} (id, name, date) VALUES(${id}, "${name}", DATE("${date}"));`, () => id);
}

function removeBattery(id) {
    return database.query(`DELETE FROM ${BATTERIES_TABLES} WHERE id=${id};`, () => id);
}

function getBatteries() {
    return database.query(`SELECT id, name, date FROM ${BATTERIES_TABLES};`, result => ({batteries : result, length : result.length}));
    // return database.query(`SELECT id, name, date FROM ${BATTERIES_TABLES};`, result => JSON.stringify({batteries : result, length : result.length}));
}

function getBatteryIds() {
    return database.query(`SELECT id, date FROM ${BATTERIES_TABLES};`, result => ({ids : result.map(data => data.id), length : result.length}));
    // return database.query(`SELECT id, date FROM ${BATTERIES_TABLES};`, result => JSON.stringify({ids : result.map(data => data.id), length : result.length}));
}

function getBatteryCapacities() {
    return database.query(`SELECT id, capacity FROM ${BATTERIES_TABLES};`, result => result);
}

function setCapacity(id, capacity) {
    return database.query(`UPDATE ${BATTERIES_TABLES} SET capacity = ${capacity} WHERE id = ${id}`, () => "Success");
}

module.exports = {
    getBattery,
    addBattery,
    removeBattery,
    getBatteries,
    getBatteryCapacities,
    getBatteryIds,
    setCapacity
};