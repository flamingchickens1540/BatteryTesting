{
    let _tests = [];
    let _batteryId;
    let _currentTest

    function loadTests(batteryId) {
        _batteryId = batteryId;
        fetch(`/BatteryTestingAPI/battery/tests/?battery-id=${batteryId}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(json => _tests = json.tests);
    }

    function getTests() {
        return _tests.map(test => ({
            name : test.name,
            startTime : test.startTime
        }));
    }

    async function selectTest(testId) {
        const test = await fetch(`/BatteryTestingAPI/test/?test-id=${testId}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}}).then(res => res.json());

        _currentTest = {
            name : test.name,
            startTime : test.startTime
        };

        if(typeof useTest == "function")
            useTest(test);
    }
}