const fetch = import("node-fetch");
const teams = require("./queries/teams.js");

const MISC_EVENT_KEY = "misc";

// list of lists of jsons
let teamEvents = {};

(async function() {
    await teams.init;

    for(const team of teams.getTeams())
        teamEvents[team.teamNumber] = await requestGetTBA(`https://thebluealliance.com/api/v3/team/frc${team.teamNumber}/events/${new Date().getFullYear()}`);
})();

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

function getCurrentEvent(teamNumber) {
    // get time
    const time = Date.now();

    for(const event of teamEvents[teamNumber]) {
        const startDate = new Date(event.start_date).getTime();
        const endDate = new Date(event.end_date).getTime();
        if(startDate <= time && endDate >= time)
            return event.key;
    }

    return "misc";
}

module.exports = {
    MISC_EVENT_KEY,
    getEvents,
    getCurrentEvent
}