#NIoc (node ioc)

A simple to use IOC container for Node.js.

## License
Released under [MIT License] (https://github.com/psmithiv/nioc/blob/master/LICENSE).

## Highlights
* Beans are defined via a simple JSON file
* Compatable with both Object as well as Class based node.js modules
* Ability to pass config objects to Class based modules and/or call bean methods post construction
* All beans are created at application launch. In the event that a bean injects a bean that has not yet been created, it will be created on demand
* Injection available via global 'inject' method
* Ability to inject both complete beans as well as individual bean properties

## Installation
From within your project, execute 'npm install nioc' from the command line. Npm will create a nioc folder within the standard node_modules folder. The module it's self will be located in 'node_modules/nioc/bin'.

## Getting Started
### Initializing NIoc
In your applications index.js/server.js file simply require the NIoc module and call the returned method passing in the path to your bean definitions json file. If no bean definitions file is specified when calling 'nioc()', NIoc will automatically look for a beans.json file one level up from 'node_modules'.

```js
var nioc = require('nioc');
nioc('path to beans.json file');
```

<b>NOTE</b>: Since nioc.js is requiring/loading the definitions file. The path is relative to 'node_modules/nioc/bin'. It is reccomended that you set the NODE_PATH environmental variable to the root of your application and reference your bean definitions json file from there. 

### Defining Beans
In your beans.json file, beans are defined as objects and reqire a single 'path' property which references the node.js module to be made available for injection.

```js
{
  "beanC": {
    "path": "path to module to be made available for injection"
  }
}
```

<b>NOTE</b>: Since nioc.js is requiring/loading the definitions file. The path is relative to 'node_modules/nioc/bin'. It is reccomended that you set the NODE_PATH environmental variable to the root of your application and reference your bean definitions json file from there. 

====

To try the example just execute 'npm install nioc' from the command line in the example folder.
