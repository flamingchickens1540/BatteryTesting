{
    let _batteryList = [];

    let _currentBattery;

    var batteryInit = (async function() {
        _batteryList = (await fetch("/BatteryTestingAPI/battery/all", {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}}).then(res => res.json())).batteries;
    })();

    function getBatteries() {
        return _batteryList.map(battery => ({
            name : battery.name,
            capacity : battery.capacity
        }));
    }
    
    function addBattery(battery) {
        _batteryList.push(battery);
    }

    function removeBattery(batteryId) {
        delete _batteryList[_batteryList.indexOf(_batteryList.find(battery => battery.id == batteryId))];
    }

    // This function will return a promise if test.js is loaded. Should not be a problem
    function selectBattery(batteryName) {
        const batteryInfo = _batteryList.find(battery => battery.name == batteryName);

        _currentBattery = {
            name : batteryInfo.name,
            capacity : batteryInfo.capacity
        };

        if(typeof useBattery == "function")
            useBattery(batteryInfo.id);

        if(typeof loadTests == "function")
            return loadTests(batteryInfo.id);
    }

    function getSelectedBattery() {
        return _currentBattery;
    }
}