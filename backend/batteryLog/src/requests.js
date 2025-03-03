const dbBatteryQueries = require("./dbqueries/batteryQueries.js");
const dbTestsQueries = require("./dbqueries/testQueries.js");
const dbRecordQueries = require("./dbqueries/recordQueries.js");
const teams = require("./dbqueries/teams.js");
const matches = require("./matches.js");

module.exports = {
    get : {
        "/battery" : req => dbBatteryQueries.getBattery(req.query["battery-id"]),
        "/battery/all" : dbBatteryQueries.getBatteries,
        "/battery/dates" : dbBatteryQueries.getBatteryDates,
        "/battery/tests" : req => dbTestsQueries.getBatteryTests(req.query["battery-id"]),
        "/test" : req => dbTestsQueries.getTest(req.query["test-id"]),
        "/test/timestamps" : req => dbTestsQueries.getTimestamps(req.query["test-id"]),
        "/battery/notes" : req => dbRecordQueries.getNotesFromBattery(req.query["battery-id"]),
        "/teams" : () => JSON.stringify(teams.getTeams()),
        "/event/current" : req => matches.getCurrentEventKey(req.query["team-number"]),
        "/event/current/matches" : req => matches.getCurrentEventMatches(req.query["team-number"]),
        "/events" : req => matches.getEvents(req.query["team-number"]), // Might be deprecated later on
        "/event" : req => matches.getEventKeyFromTime(req.query["team-number"], req.query["time"])
    },
    put : {
        "/battery" : req => {
            const body = req.body;
            const batteryId = req.query["battery-id"];
            
            if(batteryId)
                return dbBatteryQueries.editBattery(batteryId, body.batteryName, body.batteryDate, body.batteryDescription ?? "");

            return dbBatteryQueries.addBattery(body.batteryName, body.batteryDate, body.batteryDescription ?? "");
        },
        "/battery/remove" : req => dbBatteryQueries.removeBattery(req.query["battery-id"]),
        "/test/log" : async req => {
            const body = req.body;
            
            return await dbBatteryQueries.setBatteryCapacity(
                req.query["battery-id"], 
                await dbTestsQueries.logTest(req.query["battery-id"], body.time, body.name, body.startVoltage, body.success, body.timestamps),
                body.startVoltage
            );
        },
        "/note" : async req => {
            const body = req.body;
            
            return await dbRecordQueries.recordNote(req.query["battery-id"], body.time, body.note);
        },
        "/note/remove" : req => dbRecordQueries.removeNote(req.query["note-id"])
    }
}