const crypto = require("crypto");

const start = Date.now();
// If we only run this call, it will take like 771 - 1000ms aprox (depending on how fast your CPU is)
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("1:", Date.now() - start);
});

// But if we run this call too, it will take a similar value to what we saw before
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});

// How is this possible if NodeJS is supposed to be single threading?
