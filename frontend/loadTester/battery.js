(async function() {
    await batteryInit;

    const batteryNamesElement = document.querySelector(".battery #list");
    getBatteries().map(battery => {
        const element = document.createElement("option");
        element.value = battery;
        element.label = battery.name;
        return element;
    }).forEach(batteryNamesElement.appendChild, batteryNamesElement);
})();

document.querySelector(".battery #select").addEventListener("click", () => {
    const battery = document.querySelector(".battery #list").value;
    selectBattery(battery.name);
    document.querySelector(".battery #name").innerText = battery.name;
});