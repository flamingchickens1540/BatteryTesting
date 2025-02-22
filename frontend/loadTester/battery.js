(async function() {
    await batteryInit;

    const batteryNamesElement = document.querySelector(".battery #list");
    getBatteries().map(battery => {
        const element = document.createElement("option");
        element.value = battery.name;
        element.label = battery.name;
        return element;
    }).forEach(batteryNamesElement.appendChild, batteryNamesElement);
})();

document.querySelector(".battery #select").addEventListener("click", () => {
    const batteryName = document.querySelector(".battery #list").value;
    selectBattery(batteryName);
    document.querySelector(".battery #name").innerText = batteryName;
});