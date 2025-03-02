const database = require("../database.js");

let teams;

async function init() {
    teams = await database.execute("SELECT * FROM Teams;", [], result => result);
}

function getTeams() {
    return teams;
}

init();


module.exports = getTeams;