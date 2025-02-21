const express = require("express");
const app = express();

app.get("/", (req, res) => console.log(req));

app.listen(3000);