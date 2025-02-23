const database = require("../database.js");

const BATTERIES_TABLES = "Batteries";

function getBattery(batteryId) {
    return database.execute(`SELECT * FROM ${BATTERIES_TABLES} WHERE id=$1;`, [batteryId], result => result[0]);
}

async function addBattery(name, date, description) {
    // if(typeof name != "string" || typeof date != "string" || typeof description != "string")
    //     return Error("Invalid Data");

    name = name.replaceAll('"', '\\"');
    await database.execute(`INSERT INTO ${BATTERIES_TABLES} (name, date, description) VALUES($1, DATE($2), $3);`, [name, date, description], () => {});
    return await await database.execute(`SELECT id, name, date, description FROM ${BATTERIES_TABLES} WHERE name=$1;`, [name], result => result[0]);
}

// Might not work due to foreign keys
function removeBattery(id) {
    return database.execute(`DELETE FROM ${BATTERIES_TABLES} WHERE id=$1;`, [id], () => id);
}

function getBatteries() {
    return database.execute(`SELECT id, name, capacity, date FROM ${BATTERIES_TABLES};`, result => ({batteries : result, length : result.length}));
    // return database.query(`SELECT id, name, date FROM ${BATTERIES_TABLES};`, result => JSON.stringify({batteries : result, length : result.length}));
}

// function getBatteryIds() {
//     return database.query(`SELECT id FROM ${BATTERIES_TABLES};`, result => ({ids : result.map(data => data.id), length : result.length}));
//     // return database.query(`SELECT id, date FROM ${BATTERIES_TABLES};`, result => JSON.stringify({ids : result.map(data => data.id), length : result.length}));
// }

function getBatteryDates() {
    return database.execute(`SELECT id, date FROM ${BATTERIES_TABLES};`, [], result => result);
}

function setCapacity(id, capacity) {
    return database.execute(`UPDATE ${BATTERIES_TABLES} SET capacity = $1 WHERE id = $2`, [capacity, id], () => "Success");
}

module.exports = {
    getBattery,
    addBattery,
    removeBattery,
    getBatteries,
    getBatteryDates,
    setCapacity
};