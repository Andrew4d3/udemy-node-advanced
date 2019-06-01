const cluster = require("cluster");

// We ask if this is executed in cluster mode
if (cluster.isMaster) {
  // Here we creates 4 worker instances
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }
} else {
  // This is a child now, and will run normally
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hi there");
  });

  app.get("/fast", (req, res) => {
    res.send("That was fast!");
  });

  app.listen(3000);
}
