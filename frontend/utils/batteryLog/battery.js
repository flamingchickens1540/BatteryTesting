{
    let _batteryList = {};

    let _loadedBatteries = {};

    let _currentBatteryId;

    var batteryInit = (async function() {
        return fetch("/BatteryTestingAPI/battery/all", {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(res => res.batteries.forEach(battery => _batteryList[battery.id] = battery));
    })();

    function getBatteries() {
        return Object.values(_batteryList);
    }
    
    function addBattery(battery) {
        _batteryList[battery.name] = battery;
    }

    function removeBattery(batteryId) {
        delete _batteryList[batteryId];
    }

    function selectBattery(batteryId) {
        _currentBatteryId = batteryId;

        if(typeof loadTests == "function")
            return loadTests();
    }

    function loadBattery() {
        const batteryId = _currentBatteryId;

        if(isBatteryLoaded())
            return _loadedBatteries[batteryId];

        return fetch(`/BatteryTestingAPI/battery/?battery-id=${batteryId}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(res => _loadedBatteries[batteryId] = res);
    }

    function getBattery() {
        return _loadedBatteries[_currentBatteryId] ?? _batteryList[_currentBatteryId];
    }

    function isBatteryLoaded() {
        return !!_loadedBatteries[_currentBatteryId];
    }
}