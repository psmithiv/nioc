Below is a cleaned‑up, fully‑formatted version of your README.  
I’ve fixed the Markdown syntax (removed stray spaces in links, used proper heading levels, added missing backticks for code blocks, and tidied up the prose).  Feel free to copy‑paste it into your `README.md`.

```markdown
# NIoC (Node IoC)

A simple to use IoC container for Node.js.

## License
Released under the [MIT License](https://github.com/psmithiv/nioc/blob/master/LICENSE).

## Highlights
- Beans are defined via a simple JSON file.
- All beans are created at application launch.  
  If a bean injects another that hasn’t yet been created, it will be instantiated on demand.
- Pass config objects to beans on creation and/or call bean methods after construction.
- Injection available via the global `inject` method.
- Inject both whole beans and individual bean properties.

## Installation
From within your project, run:

```bash
npm install nioc
```

`npm` will create a `nioc` folder in your standard `node_modules`.  
The module itself lives in `node_modules/nioc/lib`.

## Getting Started

### Initializing NIoC
In your `index.js`/`server.js`, require the module and instantiate it with a path to your bean‑definitions JSON file.  
If no file is supplied, NIoC will look for `beans.json` one level up from `node_modules`.

```js
const nioc = require('nioc');
new nioc('path/to/beans.json');   // relative to your project root
```

> **NOTE**  
> `nioc.js` loads the definitions file relative to `node_modules/nioc/lib`.  
> It’s recommended to set the `NODE_PATH` environment variable to your application root and reference the JSON file from there.

### Defining Beans
In `beans.json`, beans are objects that **must** contain a single `path` property pointing to the module to be injected.

```json
{
  "beanC": {
    "path": "./lib/BeanC.js"
  }
}
```

> **NOTE**  
> Paths are relative to `node_modules/nioc/lib`.  
> Set `NODE_PATH` to the application root for easier referencing.

Other optional properties:

- **`config`** – an object passed to the constructor.
- **`postConstruct`** – array of `{ method, arguments }` objects to invoke after construction.
- **`singleton`** – set to `false` to create a new instance on every injection.

#### Example `beans.json`

```json
{
  "beanC": {
    "path": "./lib/BeanC.js"
  },
  "beanAA": {
    "path": "./lib/BeanA.js",
    "config": {
      "configProp1": "foo2",
      "configProp2": "bar2"
    }
  },
  "beanA": {
    "path": "./lib/BeanA.js",
    "config": { "configProp1": "foo", "configProp2": "bar" },
    "postConstruct": [
      {
        "method": "postConstructA",
        "arguments": ["postConstructParamString", 100]
      }
    ]
  },
  "beanD": {
    "path": "./lib/BeanD.js",
    "singleton": false
  }
}
```

### Creating Beans

Define your modules as ES5 classes (or any constructor function).  
Nioc will `require()` the module and instantiate it with the supplied config.

```js
// lib/BeanA.js

module.exports = init;

function init(config) {
  const me = this;
  
  // Public properties
  me.configProp1 = '';
  me.configProp2 = '';

  // Constructor logic
  function constructor() {
    me.configProp1 = config.configProp1;
    me.configProp2 = config.configProp2;
  }

  // Post‑construct methods
  me.postConstructA = function(stringArgument, numberArgument) {
    console.log(
      `INFO: BeanA.postConstructA  -  stringArgument: ${stringArgument}  -  numberArgument: ${numberArgument}`
    );
  };

  me.postConstructB = function(arrayArgument) {
    console.log(`INFO: BeanA.postConstructB  -  arrayArgument: ${arrayArgument}`);
  };

  // Create the instance
  constructor();
}
```

## Injection

You can inject whole beans or specific properties from any module.

```js
// Inject the entire bean
const bean = inject('bean id');

// Inject a single property
const prop = inject('bean id', 'propertyName');
```

## Examples

An example application lives in the `example` folder.  
To run it:

```bash
cd example
npm install nioc
node server.js
```

- **MENN Stack** (mongoose, express, NIoC, NodeJS) – <https://github.com/psmithiv/MENN>

## Roadmap

- Add ability to specify more than one bean‑definitions file.
- Unit tests.
- Configurable logging that can be disabled in production.

## Developers

- **Paul C. Smith IV** (Creator) – [email](mailto:paul.smith.iv@gmail.com) | [LinkedIn](http://www.linkedin.com/in/psmithiv)
```

Feel free to adjust any paths or wording to match your project structure. Happy coding!
