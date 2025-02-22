const dbBatteryQueries = require("./queries/batteryQueries.js");
const dbTestsQueries = require("./queries/testQueries.js");
const ID_RANGE = 500;

module.exports = {
    get : {
        "/battery" : req => dbBatteryQueries.getBattery(req.query["battery-id"]),
        "/battery/all" : dbBatteryQueries.getBatteries,
        "/battery/capacities" : dbBatteryQueries.getBatteryCapacities,
        "/tests" : req => dbTestsQueries.getBatteryTests(req.query["battery-id"])
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
        "/battery/remove" : req => dbBatteryQueries.removeBattery(req.query["battery-id"]),
        "/test/create" : req => {
            const body = req.body;
            
            return dbTestsQueries.createTest(body.batteryId, body.time, body.name);
        }
    }
}