const crypto = require("crypto");

const start = Date.now();

// Now we are going to run 5 pbkdf2 calls
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("1:", Date.now() - start);
});

// But if we run this call too, it will take a similar value to what we saw before
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("3:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("4:", Date.now() - start);
});

// The last one will take around the double of the first four. Because we are exceeding the thread pool size
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("5:", Date.now() - start);
});

/*
$ node section-1/threads.js 
4: 805
1: 808
3: 818
2: 824
5: 1572
*/
