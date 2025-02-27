{
    (async function() {
        await batteryInit;

        fillBatteryList();
    })();

    let _batteryId;

    const fillBatteryList = function() {
        const batteryListElement = document.querySelector("#batteryListScreen .list");

        while(batteryListElement.children[0])
            batteryListElement.removeChild(batteryListElement[0]);

        getBatteries().forEach(battery => {
            const batteryItemElement = document.createElement("div");

            batteryItemElement.className = "item";
            batteryItemElement.batteryId = battery.id;

            const nameElement = document.createElement("span");
            nameElement.innerText = battery.name;
            batteryItemElement.appendChild(nameElement);

            const startVoltageElement = document.createElement("span");
            startVoltageElement.innerText = battery.startVoltage;
            batteryItemElement.appendChild(startVoltageElement);

            const capacityElement = document.createElement("span");
            if(battery.capacity != null)
                capacityElement.innerText = battery.capacity.toLocaleString(2);
            batteryItemElement.appendChild(capacityElement);

            batteryItemElement.addEventListener("click", () => {
                batteryListElement.childNodes.forEach(batteryItem => batteryItem.className = "item");
                batteryItemElement.className = "item itemSelected";

                switchBattery(batteryItemElement.batteryId);
            });

            batteryListElement.appendChild(batteryItemElement);
        });
    }

    const switchBattery = async function(batteryId) {
        if(_batteryId == batteryId)
            return;

        selectBattery(_batteryId = batteryId);

        const battery = await loadBattery();

        document.querySelector("#batteryDescription .description").innerText = battery.description;
        document.querySelector("#batteryDate .date").innerText = new Date(battery.date).toLocaleDateString("en-us");

        loadNotes();
    }

    const loadNotes = async function() {
        const notes = await fetch(`/BatteryTestingAPI/battery/notes/?battery-id=${_batteryId}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(res => res.notes);

        const notesListElement = document.querySelector("#notesListScreen");

        while(notesListElement.children[0])
            notesListElement.removeChild(notesListElement.children[0]);

        notes.forEach(note => {
            const noteItemElement = document.createElement("div");

            noteItemElement.className = "item";

            const dateElement = document.createElement("span");

            dateElement.innerText = new Date(note.time).toLocaleString("en-US");
            noteItemElement.appendChild(dateElement);

            const noteElement = document.createElement("p");
            noteElement.innerText = note.note;
            noteItemElement.appendChild(noteElement);

            notesListElement.appendChild(noteItemElement);
        });
    }

    document.querySelector("#manageNotes").addEventListener("click", () => window.open(`../notesmanage/?battery-id=${getBattery().id}`, "Manage NotesWindow", "width=600,height=300"));
}