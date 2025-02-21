const express = require("express");
const app = express();

Object.entries(require("./requests.js")).forEach(method => {
    const requestMethod = app[method[0]];
    const requests = method[1];
    
    Object.entries(requests).forEach(request => {
        requestMethod(request[0], request[1]);
    });
});

app.listen(process.env.PORT);