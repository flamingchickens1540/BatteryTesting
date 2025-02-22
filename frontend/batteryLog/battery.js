{
    // JSON of battery names as keys, ids as values.
    const batteryList = localStorage.getItem("batteryList") ?? {};

    function batteryIdToName(id) {
        return Object.entries(batteryList).find(entry => entry[1] == id)[0];
    }

    function batteryNameToId(name) {
        return batteryList[name];
    }

    function getBatteryNames() {
        return Object.keys(batteryList);
    }

    function addBattery() {
        
    }
}