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
