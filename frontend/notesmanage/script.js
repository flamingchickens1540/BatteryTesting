{
    const batteryId = new URLSearchParams(window.location.search).get("battery-id");

    document.querySelector("#add").addEventListener("click", () => fetch("/BatteryTestingAPI/battery/", {method:"PUT", mode:"cors", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
        batteryId,
        time : Date.now(),
        note : document.querySelector("#note").value
    })}));
}