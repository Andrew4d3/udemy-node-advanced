// Let's change the threadpool size
process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require("crypto");

const start = Date.now();

// Now you will see how these two calls finish first
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("1:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});

// And then these two...
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("3:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("4:", Date.now() - start);
});

// And last, this one...
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("5:", Date.now() - start);
});

// In summary: Only two calls will run in paralell. Because we have the threadpool set up in 2

/*
$ node section-1/threads.js 
2: 777
1: 780
3: 1555
4: 1558
5: 2303
*/
