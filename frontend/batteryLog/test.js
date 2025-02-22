{
    // JSON of battery names as keys, and list of tests as values
    const testLogs = localStorage.getItem("testLogs") ?? {};

    function getTestNames(batteryName) {
        return Object.keys(testLogs[batteryName] ?? {});
    }

    const getBatteryTestsLog = function(batteryName) {
        return testLogs[batteryName] ?? createBatteryTestsLog(batteryName);
    }

    const createBatteryTestsLog = function(batteryName) {
        return testLogs[batteryName] = {}
    }

    function logTest(batteryName, test) {
        const testLogs = getBatteryTestsLog(batteryName);

        if(testLogs[test.name])
            throw new Error("Cannot overwrite test with the same name");

        testLogs[test.name] = JSON.parse(JSON.stringify(test));
    }
}