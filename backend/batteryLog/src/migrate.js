require("dotenv").config();

const testQueries = require("./queries/testQueries.js");
const batteryQueries = require("./queries/batteryQueries.js");

(async function() {    
    for(const battery of (await batteryQueries.getBatteries()).batteries) for(const test of (await testQueries.getBatteryTests(battery.id)).tests) {
        const timestamps = (await testQueries.getTimestamps(test.startTime)).timestamps;

        testQueries.setTestCapacity(test.startTime, testQueries.computeCapacity(timestamps));
    }
})();