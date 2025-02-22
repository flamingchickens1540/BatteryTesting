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

    function selectBattery(batteryName) {
        const batteryInfo = _batteryList.find(battery => battery.name == batteryName);

        _currentBattery = {
            name : batteryInfo.name,
            capacity : batteryInfo.capacity
        };

        loadTests(batteryInfo.id);

        if(typeof useBattery == "function")
            useBattery(batteryInfo.id);
    }

    function getCurrentBattery() {
        return _currentBattery;
    }
}