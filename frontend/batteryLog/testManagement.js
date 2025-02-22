{
    let __currentTest;

    function useTest(test) {
        __currentTest = test;
    }

    function createTest(name, time, startVoltage) {
        __currentTest = {
            batteryId : __currentTest,
            name,
            startTime : time,
            startVoltage
        };
    }

    async function logTest(success, timestamps) {
        fetch(`/BatteryTestingAPI/test/log/?battery-id=${__currentTest.batteryId}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            time : __currentTest.startTime,
            name : __currentTest.name,
            startVoltage : __currentTest.startVoltage,
            success,
            timestamps
        })});
    }
}