{
    (async function() {
        await batteryInit;

        fillBatteryList();
    })();

    function fillBatteryList() {
        const batteryNamesElement = document.querySelector("#select .list");

        batteryNamesElement.childNodes.forEach(batteryNamesElement.removeChild, batteryNamesElement);

        getBatteries().map(battery => {
            const element = document.createElement("option");
            element.value = battery.name;
            element.label = battery.name;
            return element;
        }).forEach(batteryNamesElement.appendChild, batteryNamesElement);
    }

    const switchBattery = async function(batteryName) {
        await selectBattery(batteryName);

        showBatteryInfo();
    }

    const showBatteryInfo = function() {
        const battery = getBattery();

        const date = new Date(Date.parse("2025-02-22T08:00:00.000Z"));

        document.querySelector("#info #name input").value = battery.name;
        document.querySelector("#info #date input").value = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        document.querySelector("#info #description input").value = battery.description;
    }

    const deleteBattery = function() {
        if(!confirm("Please confirm with someone before deleting a battery."))
            return;

        deleteBatteryProfile().then(fillBatteryList);
    }

    const addBattery = function() {
        addBatteryProfile(document.querySelector("#info #name input").value, document.querySelector("#info #date input").value, document.querySelector("#info #description input").value).then(fillBatteryList);
    }

    const editBattery = function() {
        editBatteryProfile(document.querySelector("#info #name input").value, document.querySelector("#info #date input").value, document.querySelector("#info #description input").value).then(fillBatteryList);
    }

    document.querySelector("#select .list").addEventListener("change", event => switchBattery(event.target.value));
    document.querySelector("#options .delete").addEventListener("click", deleteBattery);
    document.querySelector("#options .add").addEventListener("click", addBattery);
    document.querySelector("#options .edit").addEventListener("click", editBattery);
}