{
    (async function() {
        // waiting for battery initialization
        await batteryInit;

        // make list of batteries
        const batteryNamesElement = document.querySelector("#battery .list");
        getBatteries().map(battery => {
            const element = document.createElement("option");
            element.value = battery.name;
            element.label = battery.name;
            return element;
        }).forEach(batteryNamesElement.appendChild, batteryNamesElement);
    })();

    // add button functionality
    document.querySelector("#battery .select").addEventListener("click", async () => {
        const batteryName = document.querySelector("#battery .list").value;
        await selectBattery(batteryName);
        document.querySelector("#battery .name").innerText = batteryName;

        const testNamesElement = document.querySelector("#test .list");
        
        const tests = getTests().sort((a, b) => a.startTime - b.startTime);
        tests.map(test => {
            const element = document.createElement("option");
            element.value = test.startTime;
            element.label = test.name;
            return element;
        }).forEach(testNamesElement.appendChild, testNamesElement);

        testNamesElement.label = tests[0].name;
        testNamesElement.value = tests[0].startTime;

        switchTest();
    });

    document.querySelector("#test .list").addEventListener("change", switchTest);

    async function switchTest() {
        await selectTest(document.querySelector("#test .list").value);

        const test = getTest();

        document.querySelector("#test #info #duration").innerText = test.duration;
        document.querySelector("#test #info #startVoltage").innerText = test.startVoltage;
        document.querySelector("#test #info #capacity").innerText = test.capacity;
        document.querySelector("#test #info #minVoltage").innerText = test.minVoltage;
        document.querySelector("#test #info #maxVoltage").innerText = test.maxVoltage;
        document.querySelector("#test #info #minCurrent").innerText = test.minCurrent;
        document.querySelector("#test #info #maxCurrent").innerText = test.maxCurrent;
    }
}