{
    (async function() {
        await batteryInit;

        fillBatteryList();
    })();

    const fillBatteryList = function() {
        const batteryListElement = document.querySelector("#batteryList");

        while(batteryListElement.children[0])
            batteryListElement.removeChild(batteryListElement[0]);

        getBatteries().forEach(battery => {
            const batteryItemElement = document.createElement("div");

            batteryItemElement.className = "batteryItem";
            batteryItemElement.id = battery.id;

            const nameElement = document.createElement("span");
            nameElement.innerText = battery.name;
            batteryItemElement.appendChild(nameElement);

            const startVoltageElement = document.createElement("span");
            startVoltageElement.innerText = battery.startVoltage;
            batteryItemElement.appendChild(startVoltageElement);

            const capacityElement = document.createElement("span");
            capacityElement.innerText = Number(battery.capacity).toLocaleString(2);
            batteryItemElement.appendChild(capacityElement);


            batteryListElement.appendChild(batteryItemElement);
        })
    }
}