process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");

// We ask if this is executed in cluster mode
if (cluster.isMaster) {
  // Let's limit our worker creation to only one
  for (let i = 0; i < 1; i++) {
    cluster.fork();
  }
} else {
  // This is a child now, and will run normally
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("That was fast!");
  });

  app.listen(3000);
}
