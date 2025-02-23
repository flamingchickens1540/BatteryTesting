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
}