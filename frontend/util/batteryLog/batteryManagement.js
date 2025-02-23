{
    let _currentBattery;

    var useBattery = async function(battery) {
        _currentBattery = await fetch(`/BatteryTestingAPI/battery/?battery-id=${battery.id}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}}).then(res => res.json());
    }

    async function deleteBatteryProfile() {
        if(!_currentBattery)
            return;
        await fetch(`/BatteryTestingAPI/battery/remove/?battery-id=${_currentBattery.id}`, {method:"PUT"});
        removeBattery(_currentBattery);
    }

    async function addBatteryProfile(name, date) {
        const battery = await fetch("/BatteryTestingAPI/battery/", {method:"PUT", mode:"cors", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            batteryName : name,
            batteryDate : date
        })});

        addBattery(battery);
    }

    function getBattery() {
        return _currentBattery;
    }
}