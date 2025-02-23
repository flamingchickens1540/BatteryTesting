const dbBatteryQueries = require("./queries/batteryQueries.js");
const dbTestsQueries = require("./queries/testQueries.js");

module.exports = {
    get : {
        "/battery" : req => dbBatteryQueries.getBattery(req.query["battery-id"]),
        "/battery/all" : dbBatteryQueries.getBatteries,
        "/battery/dates" : dbBatteryQueries.getBatteryDates,
        "/battery/tests" : req => dbTestsQueries.getBatteryTests(req.query["battery-id"]),
        "/test" : req => dbTestsQueries.getTest(req.query["test-id"]),
        "/test/timestamps" : req => dbTestsQueries.getTimestamps(req.query["test-id"])
    },
    put : {
        "/battery" : async req => {
            const body = req.body;

            return await dbBatteryQueries.addBattery(body.batteryName, body.batteryDate);
        },
        "/battery/remove" : req => dbBatteryQueries.removeBattery(req.query["battery-id"]),
        "/test/log" : async req => {
            const body = req.body;
            
            return await dbBatteryQueries.setCapacity(req.query["battery-id"], await dbTestsQueries.logTest(req.query["battery-id"], body.time, body.name, body.startVoltage, body.success, body.timestamps));
        }
    }
}