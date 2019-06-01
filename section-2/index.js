const express = require("express");
const app = express();

// This is going to keep the event loop blocked for a specific duration (in ms)
function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get("/", (req, res) => {
  // Blocking the event look for 5 seconds
  doWork(5000);
  res.send("Hi there");
});

app.listen(3000);
