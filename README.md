# FlyFiles


FlyFiles is a nodejs application to transfer files in a local network by scanning QR Code.

  - Easy to use
  - No more companion app needed(QR enabled camera required).
  - It's fast. Because the application works in LAN.

### Tech

Flyfiles uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Twitter Bootstrap] - great UI boilerplate for modern web apps

And of course Flyfiles itself is open source with a [public repository][flyfiles]
 on GitHub.

### Installation

Flyfiles requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd flyfiles
$ npm install
$ nodemon
```
### How to use?
 - Open URL in browser that displayed on terminal after giving run command.
 - Make sure sharing devices connected in the same network.
 - Click on choose button to browse file for share with other device.
 - QR code will generate after clicking on 'Show QR' button.
 - Scan QR code with camera app on other device which supports qr code.
 - Open result from camera app in the browser.
 
License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [flyfiles]: <https://github.com/sibinjoy100/flyfiles>
   [git-repo-url]: <https://github.com/sibinjoy100/flyfiles.git>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
