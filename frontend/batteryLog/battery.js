{
    // JSON of battery names as keys, ids as values.
    let batteryList;

    async function init() {
        batteryList = (await fetch("/BatteryTestingAPI/battery/all", {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}}).then(res => res.json())).batteries;
    }

    function getBatteries() {
        return batteryList;
    }
}