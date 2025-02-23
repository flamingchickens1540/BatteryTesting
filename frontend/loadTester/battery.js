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
    
    getTests().map(test => {
        const element = document.createElement("option");
        element.value = test.startTime;
        element.label = test.name;
        return element;
    }).forEach(testNamesElement.appendChild, testNamesElement);
});

document.querySelector("#test .list").addEventListener("change", async () => {
    await selectTest(document.querySelector("#test .list").value);

    const test = getTest();

    document.querySelector("#test #info #duration") = test.duration;
    document.querySelector("#test #info #startVoltage") = test.startVoltage;
    document.querySelector("#test #info #capacity") = test.capacity;
    document.querySelector("#test #info #minVoltage") = test.minVoltage;
    document.querySelector("#test #info #maxVoltage") = test.maxVoltage;
    document.querySelector("#test #info #minCurrent") = test.minCurrent;
    document.querySelector("#test #info #maxCurrent") = test.maxCurrent;
});