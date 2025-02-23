{
    let _currentBattery;

    function useBattery(battery) {
        _currentBattery = battery;
    }

    async function deleteBatteryProfile() {
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
}