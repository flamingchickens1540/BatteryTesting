const database = require("../database.js");

const NOTES_TABLE = "Battery_Notes";

function getNotesFromBattery(batteryId) {
    return database.execute(`SELECT * FROM ${NOTES_TABLE} WHERE batteryId=?;`, [batteryId], result => ({notes : result, length : result.length}));
}

function recordNote(batteryId, time, note) {
    return database.execute(`INSERT INTO ${NOTES_TABLE} (batteryId, time, note) VALUES(?, ?, ?);`, [batteryId, time, note], result => { success : true });
}

module.exports = {
    getNotesFromBattery,
    recordNote
}