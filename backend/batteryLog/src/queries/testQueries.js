const database = require("../database.js");

const TESTS_TABLE = "Tests";
const TIMESTAMPS_TABLE = "Timestamps";
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
    return database.query(`INSERT INTO ${TESTS_TABLE} (batteryId, startTime, name, codeVersion) VALUES(${batteryId}, ${time}, "${name}", ${CODE_VERSION});`, () => time);
}

async function completeTest(testId, timestamps) {
    for(const timestamp of timestamps) {
        const result = await insertTimestamp(testId, timestamp.time, timestamp.voltage, timestamp.current);

        if(result instanceof Error)
            return result;
    }

    return await database.query(`UPDATE ${TESTS_TABLE} SET success = TRUE WHERE startTime=${testId};`, () => time);
} 

module.exports = {
    getBatteryTests,
    getTimestamps,
    createTest,
    completeTest
};