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
