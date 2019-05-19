## NodeJS Internals

![Diagram](https://snag.gy/9kzAT4.jpg)

- Inside NodeJS there is a series of wrappers used to interact with the OS.
- The purpose of node is to give us a nice consistent API for getting access to functionality that is ultimately implemented inside of V8 and libvuv

## Modules Implementations

![Diagram2](https://snag.gy/fOqya3.jpg)

- Let's investigate how the pbkdf2 is implemented internally to userstand better how Node js internals work:
  ![Diagram3](https://snag.gy/R2mTGh.jpg)

## Node backed by C++

- The statement `process.binding` is a bridge between JS code and C++ functions.
- V8 acts like a intermediary that allows values that are defined inside of JS to be transtaled into C++ equivalence

## The Basic of Threads

- Threads are units of instruction that are waiting to be executed by the CPU
- Deciding which order to execute these threads is referred to as scheduling. Scheduling is controlled by your operating system.
- Two ways of improving the rate at which we process threads is to either add moreCPU cores to our machine or to allow our OS scheduler to detect big pauses in processing time due to expensive input and output operations.

## The Node Event Loop

- You can think of the event loop as being like a control structure that decides what our one thread should be doing at any given point in time.
- This event loop is the absolute core of every program that you and I run and every program that you and I run has exactly one event loop.
- Understanding how the event loop works is extremely important because a lot of performance concerns about node boiled down to eventually how the event loop behaves.
- We will understand how the event loop works using some pseudo-code:

```
# (starting the node script)
$node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorde from myFile running
myFile.runContents(); // This function will run the file content

// This function determines whether the event loop can continue or not.
function shouldContinue() {
 // Check one: Any pending setTimeout, setInterval, setImmediate?
 // Check two: Any pending OS tasks? (Like server listening to port)
 // Chec three: Any pending long running operations? (Like fs module - filesystem)
 return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
}

// This while loop represents the Event loop
// The entire body executes in one "tick"
while(shouldContinue()) {
 /*
    1) Node looks at pendingTimers (not setImmediate) and sees if any functions are ready to be called. setTimeout, setInterva */

 /*
    2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
 */

 /*
    3) Pause execution. Continue when...
    - a new pendingOSTask is done
    - a new pendingOperation is done
    - a new timer is about to complete
 */

 /*
    4) Look at pendingTimers. Call any setImmediate
 */

 /*
    5) Handle any 'close' events
 */
}
```

## Is Node Single Threaded?

- Many people claim that NodeJS is single threaded. Reason why some developers avoid using it for highly intensive CPU operations. But this is not entirely true.
- The Node Event loop is in fact Single threaded but some Node Framework/std libraries can work using multiple threads.
  ![Diagram](https://snag.gy/hzHRLJ.jpg)
- We will demostrate this using the following script: [threads.js](https://github.com/Andrew4d3/udemy-node-advanced/blob/master/section-1/threads.js)

- If node was single threaded, this would happen
![image](https://user-images.githubusercontent.com/1868409/57901629-f3c5c300-7833-11e9-97a5-e6d5677e8b58.png)
- But instead, this is happening
![image](https://user-images.githubusercontent.com/1868409/57901778-6767d000-7834-11e9-8e3b-e639a1127480.png)

### So why is that?
- Do you remember the libuv library? That library has among its responsabilities to manage a thread pool which is used for **some** (an the keyword here is some!) standard funtions of NodeJS.
![image](https://user-images.githubusercontent.com/1868409/57973487-5e334c00-7977-11e9-90e9-295d0ec3a00e.png)
- We can prove this whith an experiment. Run the thread.js script. Depending on you machine you will see a different result. But for a Macbook pro with 2 cores and multi-threading enable, the result will be something like this:
![image](https://user-images.githubusercontent.com/1868409/57975529-ce05fe80-7998-11e9-976b-1ca9d8084c23.png)
- Notice how the first 4 calls run in paralell, but the fifth call waits for a thread to be available, so it's gonna take it a little bit more of time. This is a more comprehensive way of what it's happening:
![image](https://user-images.githubusercontent.com/1868409/57975558-4f5d9100-7999-11e9-8b49-cc3d1f0bd988.png)
- Now let's try changing the threadpool size. Check and run the thread.js file [here](https://github.com/Andrew4d3/udemy-node-advanced/blob/94448db0dd88332663439ebd80bd0357a25f0e62/section-1/threads.js). You will see a different behavior similar to this:
![image](https://user-images.githubusercontent.com/1868409/57976351-ad936f80-79ab-11e9-9ecc-42af8d6a9152.png)




