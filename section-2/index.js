const cluster = require("cluster");

// We ask if this is executed in cluster mode
if (cluster.isMaster) {
  // If that's the case. Index.js will run in "slave mode"
  cluster.fork();
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

  app.listen(3000);
}
