## NodeJS Internals
![Diagram](https://snag.gy/9kzAT4.jpg)
- Inside NodeJS there is a series of wrappers used to interact with our OS.
- The purpose of node is to give us a nice consistent API for getting access to functionality that is ultimately implemented inside of V8 and libvuv
## Modules Implementations
![Diagram2](https://snag.gy/fOqya3.jpg)
- Let's investigate how the pbkdf2 is implemented internally to userstand better how Node js internals work:
![Diagram3](https://snag.gy/R2mTGh.jpg)
