const express = require("express");
const app = express();

app.use(express.json());

Object.entries(require("./requests.js")).forEach(method => {
    const requestMethod = app[method[0]].bind(app);
    const requests = method[1];
    
    Object.entries(requests).forEach(request => {
        requestMethod(request[0], async (req, res) => {
            const result = await request[1](req);
            console.log(result)
            if(result == undefined) {
                res.status(500);
                return res.send("Error");
            }

            res.send(result);
        });
    });
});

app.listen(process.env.PORT);