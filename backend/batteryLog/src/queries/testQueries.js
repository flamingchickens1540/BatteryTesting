const database = require("../database.js");

const TESTS_TABLE = "Tests";
const TIMESTAMPS_TABLE = "Timestamps";
const CODE_VERSION = 0;

function getBatteryTests(batteryId) {
    // if(batteryId == undefined)
    //     return Error("Invalid Data");

    return database.execute(`SELECT * FROM ${TESTS_TABLE} WHERE batteryId=?;`, [batteryId], result => ({tests : result, length : result.length}));
}

function getTest(testId) {
    // if(testId == undefined)
    //     return Error("Invalid Data");

    return database.execute(`SELECT batteryId, startTime, name, success, capacity, codeVersion, startVoltage, duration, (SELECT MIN(voltage) FROM ${TIMESTAMPS_TABLE} WHERE testId=?) AS minVoltage, (SELECT MAX(voltage) FROM ${TIMESTAMPS_TABLE} WHERE testId=?) AS maxVoltage, (SELECT MIN(current) FROM ${TIMESTAMPS_TABLE} WHERE testId=?) AS minCurrent, (SELECT MAX(current) FROM ${TIMESTAMPS_TABLE} WHERE testId=?) AS maxCurrent FROM ${TESTS_TABLE} WHERE startTime=?;`, [testId, testId, testId, testId, testId], result => result[0]);
}

function getTimestamps(testId) {
    // if(testId == undefined)
    //     return Error("Invalid Data");

    return database.execute(`SELECT * FROM ${TIMESTAMPS_TABLE} WHERE testId=?;`, [testId], result => ({timestamps : result, length : result.length}));
}

function insertTimestamp(testId, time, voltage, current) {
    // if(testId == undefined)
    //     return Error("Invalid Data");

    return database.execute(`INSERT INTO ${TIMESTAMPS_TABLE} VALUES(?, ?, ?, ?)`, [testId, time, voltage, current], () => time);
}

async function logTest(batteryId, time, name, startVoltage, success, timestamps) {
    let lastTime = time;
    timestamps.forEach(timestamp => {
        const timestampTime = timestamp.time;

        timestamp.time -= lastTime;

        lastTime = timestampTime;
    });

    const capacity = timestamps.map(timestamp => timestamp.current * timestamp.voltage * timestamp.time).reduce((total, watt) => total + watt) / 60 / 60 / 1000;

    await database.execute(`INSERT INTO ${TESTS_TABLE} VALUES(?, ?, ?, ?, ?, ?, ?, ?);`, [batteryId, time, timestamps[timestamps.length-1].time - time, name.replaceAll('"', ''), startVoltage, capacity, success ? 1 : 0, CODE_VERSION], () => {});

    for(const timestamp of timestamps) {
        const result = await insertTimestamp(time, Number(timestamp.time), Number(timestamp.voltage), Number(timestamp.current));

        if(result instanceof Error)
            return result;
    }

    return capacity;
} 

module.exports = {
    getBatteryTests,
    getTimestamps,
    logTest,
    getTest
};