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
    return database.query(`SELECT id, name, date FROM ${BATTERIES_TABLES};`, result => result);
}

function getBatteryIds() {
    return database.query(`SELECT id date FROM ${BATTERIES_TABLES};`, result => result.map(data => data.id));
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