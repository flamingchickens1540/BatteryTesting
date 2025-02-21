const database = require("../database.js");

const BATTERIES_TABLES = "batteries";

function getBattery(batteryId) {
    return database.query(`SELECT * FROM ${BATTERIES_TABLES} WHERE id=${batteryId};`, result => result[0]);
}

function addBattery(id, name, date) {
    return database.query(`INSERT INTO ${BATTERIES_TABLES} VALUES(${id}, "${name}", DATE("${date}"), NULL, NULL);`, () => id);
}

function getBatteries() {
    return database.query(`SELECT id, name, capacity FROM ${BATTERIES_TABLES};`, result => result);
}

function setCapacity(id, capacity) {
    return database.query(`UPDATE ${BATTERIES_TABLES} SET capacity = ${capacity} WHERE id = ${id}`, () => "Success");
}

module.exports = {
    getBattery,
    addBattery,
    getBatteries,
    setCapacity
};