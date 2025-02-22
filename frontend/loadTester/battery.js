(async function() {
    // waiting for battery initialization
    await batteryInit;

    // make list of batteries
    const batteryNamesElement = document.querySelector(".battery #list");
    getBatteries().map(battery => {
        const element = document.createElement("option");
        element.value = battery.name;
        element.label = battery.name;
        return element;
    }).forEach(batteryNamesElement.appendChild, batteryNamesElement);
})();

// add button functionality
document.querySelector(".battery #select").addEventListener("click", () => {
    const batteryName = document.querySelector(".battery #list").value;
    selectBattery(batteryName);
    document.querySelector(".battery #name").innerText = batteryName;
});