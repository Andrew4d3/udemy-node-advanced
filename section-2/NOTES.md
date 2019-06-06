# Section 2: Enhancing Node Performance

When it comes to enhancing Node performance. There are two known ways:
![image](https://user-images.githubusercontent.com/1868409/58753637-6c618c00-8490-11e9-872a-1888f4e11fd5.png)
NOTE: It's not an experimental feature for Node >= 11.11.0

## Blocking the Event Loop

- If we want to block the event we just have to add a while loop and force it to run for a specific amount of time. [Here](https://github.com/Andrew4d3/udemy-node-advanced/blob/master/section-2/index.js) there's an example
- If we run the server and try to make two request separately, we will notice how one takes 5s and the second one a little bit more. That's because the second one will wait for the event loop to be available again.

## Clusterin in Theory

- So how clustering works in theory? When you run NodeJS in clustering, it creates several node instances known as "worker instances". Check the following diagram:

![image](https://user-images.githubusercontent.com/1868409/58754116-dc274500-8497-11e9-9790-6832e9dd555a.png)

- Here you have a "Cluster Manager" which is responsible to create the workers instances we are talking about. It goes like this:

![image](https://user-images.githubusercontent.com/1868409/58754136-201a4a00-8498-11e9-8fbb-dea8f00ef2ac.png)

- The index.js file runs several times. The first one is when we run the Cluster manager, which, as I said before, it will create new worker instances.

## Clustering in Action

- Check the example [Here](https://github.com/Andrew4d3/udemy-node-advanced/blob/114d533b19e0c5470e02b9f53066eedea77e3ad0/section-2/index.js) to see what we need to do in order to run our app in "Cluster Mode"
- In the exaple above, we are lifting 4 worker instances.
- Let's test this by running again our server but with some modifications. We will define a second path, that won't take any time to respond back. Check code [Here](https://github.com/Andrew4d3/udemy-node-advanced/blob/114d533b19e0c5470e02b9f53066eedea77e3ad0/section-2/index.js).
- Now if you try to run both paths in paralell, you will notice how the second path will respond inmediatly. Even though, the first path is still waiting to respond. This is happening because we are using a different worker for the second path.
- You can check how this node app will behave if there was just one worker running. Just change the `i` value from the `for` statement to 1 (so only one worker runs) Now if you try to run both requests in paralell, you will notice how the "fast" path will not respond inmediately anymore.
- This is a marble diagram that explains what happens (R means "response", A means "worker available") :

```
With several workers available
path / takes one worker
|(A)---------(R)
path /fast takes a different worker
|(A)--(R)

With just one worker available
path / takes one worker
|(A)---------(R)
path /fast waits for the only worker to be available (A)
|-------------(A)--(R)
```

## Benchmarking Server Performance

So far, we have been checking the performance of our server using the browser and refreshing pages. But we would like to have a more "scientific" way to do this:
We're going to use "ab" or "Apache benchmarks". If you don't have it installed, just enter this command into the terminal:

```
$ sudo apt install apache2-utils
```

After it ends installing and while you're running the server go a do this (again, in the terminal):

```
$ ab -c 50 -n 500 localhost:3000/fast
```

You will see some results like these ones:

```
This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Finished 500 requests


Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /fast
Document Length:        14 bytes

Concurrency Level:      50
Time taken for tests:   0.121 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      106500 bytes
HTML transferred:       7000 bytes
Requests per second:    4121.20 [#/sec] (mean)
Time per request:       12.132 [ms] (mean)
Time per request:       0.243 [ms] (mean, across all concurrent requests)
Transfer rate:          857.24 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       2
Processing:     5   11   9.6      8      43
Waiting:        5   11   9.6      8      43
Total:          6   12  10.0      8      44

Percentage of the requests served within a certain time (ms)
  50%      8
  66%      9
  75%     10
  80%     10
  90%     36
  95%     42
  98%     43
  99%     43
 100%     44 (longest request)
```

Here you chaeck some interesting data like "Time per request", "Request per second" among others.

## Benchmark Refactor

- Blocking the event loop using a `while` during a time span can be useful at times. But if we really want to benchmark how our apps behaves under high CPU load, it's better to use other functions, like the `pbkdf2` function we used in the past section. Let's modify our code [here](https://github.com/Andrew4d3/udemy-node-advanced/blob/659cf58309a76ef34d439bf174f04ae4372d0e16/section-2/index.js):
- Now we're calling the `pbkdf2` function instead of the `while` statement. Besides, we're setting the threadpool size to 1 and limiting the number of workers to only 1 as well.
