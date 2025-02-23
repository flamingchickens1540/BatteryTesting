{
    (async function() {
        await batteryInit;

        fillBatteryList();
    })();

    function fillBatteryList() {
        const batteryNamesElement = document.querySelector("#select .list");

        batteryNamesElement.childNodes.forEach(child => child.remove());

        getBatteries().map(battery => {
            const element = document.createElement("option");
            element.value = battery.name;
            element.label = battery.name;
            return element;
        }).forEach(batteryNamesElement.appendChild, batteryNamesElement);

        switchBattery(batteryNamesElement.value);
    }

    const switchBattery = async function(batteryName) {
        await selectBattery(batteryName);

        showBatteryInfo();
    }

    const showBatteryInfo = function() {
        const battery = getBattery();

        document.querySelector("#info #date").innerText = battery.date;
        document.querySelector("#info #capacity").innerText = battery.capacity;
        document.querySelector("#info #description").innerText = battery.description;
    }

    document.querySelector("#select .list").addEventListener("change", event => switchBattery(event.target.value));
}