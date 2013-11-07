#NIoc (node ioc)

A simple to use IOC container for Node.js.

## License
Released under [MIT License] (https://github.com/psmithiv/nioc/blob/master/LICENSE).

## Highlights
* Beans are defined via a simple JSON file
* Compatable with both Object as well as Class based node.js modules
* Ability to pass config objects to Class based modules and/or call bean methods post construction
* Injection available via global 'inject' method
* Ability to inject both complete beans as well as individual bean properties

## Installation
From within your project, execute 'npm install nioc' from the command line. Npm will create a nioc folder within the standard node_modules folder. The module it's self will be located in 'node_modules/nioc/bin'.

## Getting Started
In your applications server.js file simply require the NIoc module and call the returned method passing in the path to your bean definitions js file.

```js
var nioc = require('nioc');
nioc('path to bean defnintions js file');
```

====

To try the example just execute 'npm install nioc' from the command line in the example folder.
