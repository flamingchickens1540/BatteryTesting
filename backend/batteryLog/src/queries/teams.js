const database = require("../database.js");

let teams;

function getTeams() {
    return teams;
}

const init = (async function() {
    teams = await database.execute("SELECT * FROM Teams;", [], result => result);
})();


module.exports = {
    getTeams,
    init
};