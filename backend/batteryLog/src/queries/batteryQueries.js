const database = require("../database.js");

const BATTERIES_TABLES = "Batteries";

const ID_RANGE = 500;

function getBattery(batteryId) {
    return database.query(`SELECT * FROM ${BATTERIES_TABLES} WHERE id=${Number(batteryId)};`, result => result[0]);
}

async function addBattery(name, date) {
    if(typeof name != "string" || typeof date != "string")
        return Error("Invalid Data");

    const ids = (await getBatteryIds()).ids;

    let id;

    do {
        id = Math.floor(Math.random() * ID_RANGE);
    } while(ids.includes(id));

    return await database.query(`INSERT INTO ${BATTERIES_TABLES} (id, name, date) VALUES(${id}, "${name.replaceAll('"', '')}", DATE("${date.replaceAll('"', '')}"));`, () => {id, name, date});
}

// Might not work due to foreign keys
function removeBattery(id) {
    return database.query(`DELETE FROM ${BATTERIES_TABLES} WHERE id=${Number(id)};`, () => id);
}

function getBatteries() {
    return database.query(`SELECT id, name, capacity FROM ${BATTERIES_TABLES};`, result => ({batteries : result, length : result.length}));
    // return database.query(`SELECT id, name, date FROM ${BATTERIES_TABLES};`, result => JSON.stringify({batteries : result, length : result.length}));
}

function getBatteryIds() {
    return database.query(`SELECT id FROM ${BATTERIES_TABLES};`, result => ({ids : result.map(data => data.id), length : result.length}));
    // return database.query(`SELECT id, date FROM ${BATTERIES_TABLES};`, result => JSON.stringify({ids : result.map(data => data.id), length : result.length}));
}

function getBatteryDates() {
    return database.query(`SELECT id, date FROM ${BATTERIES_TABLES};`, result => result);
}

function setCapacity(id, capacity) {
    return database.query(`UPDATE ${BATTERIES_TABLES} SET capacity = ${Number(capacity)} WHERE id = ${Number(id)}`, () => "Success");
}

module.exports = {
    getBattery,
    addBattery,
    removeBattery,
    getBatteries,
    getBatteryDates,
    setCapacity
};