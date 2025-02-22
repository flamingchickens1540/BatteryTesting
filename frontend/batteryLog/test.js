{
    let __tests = [];
    let __batteryId;
    let __currentTest

    async function loadTests(batteryId) {
        __batteryId = batteryId;
        fetch(`/BatteryTestingAPI/battery/tests/?battery-id=${batteryId}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(json => __tests = json.tests);
    }

    function getTests() {
        return __tests.map(test => ({
            name : test.name,
            startTime : test.startTime
        }));
    }

    async function selectTest(testId) {
        const test = await fetch(`/BatteryTestingAPI/test/?test-id=${testId}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}}).then(res => res.json());

        __currentTest = {
            name : test.name,
            minVoltage : test.minVoltage,
            maxVoltage : test.maxVoltage,
            minCurrent : test.minCurrent,
            maxCurrent : test.maxCurrent,
            duration : test.duration,
            capacity : test.capacity,
            startVoltage : test.startVoltage
        }

        if(typeof useTest == "function")
            useTest(test);
    }

    function getTest() {
        return __currentTest;
    }
}