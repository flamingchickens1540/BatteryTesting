{
    let _currentTest;

    function useTest(test) {
        _currentTest = test;
    }

    function createTest(name, time, startVoltage) {
        _currentTest = {
            batteryId : _currentTest,
            name,
            startTime : time,
            startVoltage
        };
    }

    async function logTest(success, timestamps) {
        fetch(`/BatteryTestingAPI/test/log/?battery-id=${_currentTest.batteryId}`, {method:"PUT", mode:"cors", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            time : _currentTest.startTime,
            name : _currentTest.name,
            startVoltage : _currentTest.startVoltage,
            success,
            timestamps
        })});
    }

    function getTest() {
        return _currentTest;
    }

    function getTimestamps() {
        return fetch(`/BatteryTestingAPI/battery/test/timestamps/?test-id=${_currentTest.startTime}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}}).then(res => res.json());
    }
}