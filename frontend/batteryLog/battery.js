{
    // JSON of battery names as keys, ids as values.
    const batteryList = localStorage.getItem("batteryList") ?? {};

    function getBatteries() {
        
        return Object.keys(batteryList);
    }

    function addBattery() {
        
    }
}