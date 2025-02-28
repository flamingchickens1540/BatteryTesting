{
    const battery = opener.getBattery();

    document.querySelector("#batteryName").innerText = battery.name;

    document.querySelector("#batteryName").appendChild(opener.document.querySelector("columnNames"));
}