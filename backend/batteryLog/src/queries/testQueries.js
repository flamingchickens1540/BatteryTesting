const database = require("../database.js");

const TESTS_TABLE = "tests";
const TIMESTAMPS_TABLE = "timestamps";
const CODE_VERSION = 0;

function getBatteryTests(batteryId) {
    return new Promise(res => {
        database.query(`SELECT * FROM ${TESTS_TABLE} WHERE batteryId=${batteryId};`, (error, result, fields) => {
            if (error) {
                console.error(error);
                return res(undefined);
            }

            res(result);
        });
    });
}

function getTimestamps(testId) {
    return new Promise(res => {
        database.query(`SELECT * FROM ${TIMESTAMPS_TABLE} WHERE testId=${testId};`, (error, result, fields) => {
            if (error) {
                console.error(error);
                return res(undefined);
            }

            res(result);
        });
    });
}

function createTest(batteryId, time, name) {
    return new Promise(res => {
        database.query(`INSERT INTO ${TESTS_TABLE} VALUES(${batteryId}, ${time}, "${name}", FALSE, NULL, ${CODE_VERSION});`, (error, result, fields) => {
            if (error) {
                console.error(error);
                return res(undefined);
            }

            res("Success");
        });
    });
}