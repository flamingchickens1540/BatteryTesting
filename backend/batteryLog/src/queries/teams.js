const database = require("../database.js");

let teams;

async function init() {
    database.execute("SELECT * FROM Teams;", [], result => teams = result);
}

function getTeams() {
    return teams;
}

init();


module.exports = getTeams;