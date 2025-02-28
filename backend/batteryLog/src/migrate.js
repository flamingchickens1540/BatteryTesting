require("dotenv").config();

const testQueries = require("./queries/testQueries.js");
const batteryQueries = require("./queries/batteryQueries.js");

(async function() {    
    for(const battery of (await batteryQueries.getBatteries()).batteries) {
        console.log(battery.name);

        const tests = (await testQueries.getBatteryTests(battery.id)).tests;
        for(const test of tests) {
            const timestamps = (await testQueries.getTimestamps(test.startTime)).timestamps;

            await testQueries.setTestCapacity(test.startTime, testQueries.computeCapacity(timestamps));
        }

        await batteryQueries.setBatteryCapacity(battery.id, tests.reduce((a, b) => a.startTime > b.startTime ? a : b));
    }
})();