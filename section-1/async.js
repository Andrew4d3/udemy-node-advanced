const https = require("https");

const start = Date.now();

// Let's wrap the http call around a function so that we avoid repeating code.
function doRequest() {
  https
    .request("https://www.google.com", res => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

// And now make multiple http requests...
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();

// You will notice how all the http requests seem to run in paralell, regardless of the threadpool size. Why is this is happening?

/*
$ node section-1/async.js 
155
156
175
178
180
181
181
181
184
*/
