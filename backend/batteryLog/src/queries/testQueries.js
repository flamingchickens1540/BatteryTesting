const database = require("../database.js");

const TESTS_TABLE = "Tests";
const TIMESTAMPS_TABLE = "Timestamps";
const CODE_VERSION = 0;

function getBatteryTests(batteryId) {
    return database.query(`SELECT * FROM ${TESTS_TABLE} WHERE batteryId=${Number(batteryId)};`, result => ({tests : result, length : result.length}));
}

function getTest(testId) {
    return database.query(`SELECT batteryId, startTime, name, success, capacity, codeVersion, startVoltage, duration, MIN(SELECT voltage FROM ${TIMESTAMPS_TABLE} WHERE testId=${Number(testId)}) AS minVoltage, MAX(SELECT voltage FROM ${TIMESTAMPS_TABLE} WHERE testId=${Number(testId)}) AS maxVoltage, MIN(SELECT current FROM ${TIMESTAMPS_TABLE} WHERE testId=${Number(testId)}) AS minCurrent, MAX(SELECT current FROM ${TIMESTAMPS_TABLE} WHERE testId=${Number(testId)}) AS maxCurrent FROM ${TESTS_TABLE} WHERE startTime=${Number(testId)};`, result => result[0]);
}

function getTimestamps(testId) {
    return database.query(`SELECT * FROM ${TIMESTAMPS_TABLE} WHERE testId=${Number(testId)};`, result => ({timestamps : result, length : result.length}));
}

function insertTimestamp(testId, time, voltage, current) {
    return database.query(`INSERT INTO ${TIMESTAMPS_TABLE} VALUES(${Number(testId)}, ${Number(time)}, ${Number(voltage)}, ${Number(current)})`, () => time);
}

async function logTest(batteryId, time, name, startVoltage, success, timestamps) {
    if(isNaN(Number(batteryId)) || isNaN(Number(time)) || typeof name != "string")
        return Error("Invalid Data");

    const capacity = timestamps.map(timestamps => timestamps.current * timestamps.voltage).reduce((total, watt) => total + watt) / 60 / 60 / 1000;

    time = Number(time);

    await database.query(`INSERT INTO ${TESTS_TABLE} VALUES(${Number(batteryId)}, ${time}, ${timestamps[timestamps.length-1].time - time}, "${name.replaceAll('"', '')}", ${Number(startVoltage)}, ${capacity}, ${success ? 1 : 0}, ${CODE_VERSION});`, () => {});

    for(const timestamp of timestamps) {
        const result = await insertTimestamp(time, Number(timestamp.time), Number(timestamp.voltage), Number(timestamp.current));

        if(result instanceof Error)
            return result;
    }

    return database.query(`UPDATE ${BATTERIES_TABLES} SET capacity = ${capacity} WHERE id = ${Number(batteryId)}`, () => "Success");
} 

module.exports = {
    getBatteryTests,
    getTimestamps,
    logTest,
    getTest
};