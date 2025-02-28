{
    const batteryId = new URLSearchParams(window.location.search).get("battery-id");

    alert(window.opener.getBattery().name);

    document.querySelector("#add").addEventListener("click", () => fetch(`/BatteryTestingAPI/note/?battery-id=${batteryId}`, {method:"PUT", mode:"cors", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
        time : Date.now(),
        note : document.querySelector("#note").value
    })}));
}