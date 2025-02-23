{
    let _currentBattery;

    var useBattery = async function(battery) {
        _currentBattery = await fetch(`/BatteryTestingAPI/battery/?battery-id=${battery.id}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}}).then(res => res.json());
    }

    function deleteBatteryProfile() {
        if(!_currentBattery)
            return;
        return fetch(`/BatteryTestingAPI/battery/remove/?battery-id=${_currentBattery.id}`, {method:"PUT"}).then(() => removeBattery(_currentBattery.id));
    }

    async function addBatteryProfile(name, date, description) {
        const battery = await fetch("/BatteryTestingAPI/battery/", {method:"PUT", mode:"cors", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            batteryName : name,
            batteryDate : date,
            batteryDescription : description
        })});

        addBattery(battery);
    }

    function getBattery() {
        return _currentBattery;
    }
}