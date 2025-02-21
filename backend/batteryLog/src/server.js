const express = require("express");
const app = express();

Object.entries(require("./requests.js")).forEach(entry => {
    app.get(entry[0], entry[1]);
});

app.listen(process.env.PORT);