const database = require("../database.js");

const TESTS_TABLE = "tests";
const TIMESTAMPS_TABLE = "timestamps";
const CODE_VERSION = 0;

function getBatteryTests(batteryId) {
    return database.query(`SELECT * FROM ${TESTS_TABLE} WHERE batteryId=${batteryId};`, result => result);
}

function getTimestamps(testId) {
    return database.query(`SELECT * FROM ${TIMESTAMPS_TABLE} WHERE testId=${testId};`, result => result)
}

function insertTimestamp(testId, time, voltage, current) {
    return database.query(`INSERT INTO${TIMESTAMPS_TABLE} VALUES(${testId}, ${time}, ${voltage}, ${current})`, () => time);
}

function createTest(batteryId, time, name) {
    return database.query(`INSERT INTO ${TESTS_TABLE} VALUES(${batteryId}, ${time}, "${name}", FALSE, NULL, ${CODE_VERSION});`, () => time);
}

function completeTest(testId) {
    return database.query(`UPDATE ${TESTS_TABLE} SET success = TRUE WHERE startTime=${testId};`, () => time);
} 

module.exports = {
    getBatteryTests,
    getTimestamps,
    insertTimestamp,
    createTest,
    completeTest
};