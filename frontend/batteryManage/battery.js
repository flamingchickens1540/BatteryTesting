(async function() {
    await batteryInit;

    const batteryNamesElement = document.querySelector("#batteryList");
    getBatteries().map(battery => {
        const element = document.createElement("option");
        element.value = battery.name;
        element.label = battery.name;
        return element;
    }).forEach(batteryNamesElement.appendChild, batteryNamesElement);
})();