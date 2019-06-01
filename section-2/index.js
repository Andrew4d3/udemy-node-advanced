const express = require("express");
const app = express();

app.get("/", (req, send) => {
  req.send("Hi there");
});

app.listen(3000);
