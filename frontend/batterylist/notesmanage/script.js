{
    const battery = opener.getBattery();

    document.querySelector("#batteryName").innerText = battery.name;

    document.querySelector("#notesContainer").appendChild(opener.document.querySelector("#notesListScreen"));
}