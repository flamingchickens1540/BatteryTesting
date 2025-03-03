const teams = require("./dbqueries/teams.js");

const MISC_EVENT_KEY = "misc";

// list of lists of jsons
let teamEvents = {};

function requestGetTBA(path) {
    return fetch(
        path,
        {
            method : "GET",
            headers: {
                "X-TBA-Auth-Key" : process.env.TBA_API_KEY
            }
        }
    );
}

function getEvents(teamNumber) {
    return teamEvents[teamNumber];
}

function getEventFromTime(teamNumber, time) {
    for(const event of getEvents(teamNumber)) {
        const startDate = new Date(event.start_date).getTime();
        const endDate = new Date(event.end_date).getTime() + (1000 * 60 * 60 * 24);
        if(startDate <= time && endDate >= time)
            return event;
    }

    return null;
}

function getCurrentEventKey(teamNumber) {
    return getEventFromTime(teamNumber, Date.now())?.key ?? "misc";
}

function getEventKeyFromTime(teamNumber, time) {
    return getEventFromTime(teamNumber, time)?.key ?? "misc";
}

(async function() {
    await teams.init;

    for(const team of teams.getTeams())
        teamEvents[team.teamNumber] = await (requestGetTBA(`https://thebluealliance.com/api/v3/team/frc${team.teamNumber}/events/${new Date().getFullYear()}`).then(res => res.json()));
})();

module.exports = {
    MISC_EVENT_KEY,
    getEvents,
    getCurrentEventKey,
    getEventKeyFromTime
}