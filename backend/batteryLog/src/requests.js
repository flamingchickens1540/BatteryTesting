const dbBatteryQueries = require("./queries/batteryQueries.js");
const ID_RANGE = 500;

module.exports = {
    get : {
        "/battery" : async req => await dbBatteryQueries.getBattery(req.query["battery-id"]),
        "/battery/all" : dbBatteryQueries.getBatteries,
        "/capacities" : dbBatteryQueries.getBatteryCapacities
    },
    post : {
        "/battery" : async req => {
            const ids = await dbBatteryQueries.getBatteryIds();

            let id;
 
            do {
                id = Math.floor(Math.random() * ID_RANGE);
            } while(ids.includes(id));

            const body = req.body;

            return await dbBatteryQueries.addBattery(id, body.batteryName, body.batteryDate);
        },
        "/removeBattery" : async req => await dbBatteryQueries.removeBattery(req.query["battery-id"])
    }
}