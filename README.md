# DOM Generator

DOM Generator (dg-dom for short) it is a lightweight template engine for javascript that does not need any compiling and is made in pure javascript. It all started as a hack in 2011 and is my one o my early days projects.

  - I created it with the sole purpose to stop using string concatenation when generation html code
  - Is uses lists and objects to define the HTML elements
  - Functions and parameter bindings are used for generating complex structures

### How To Use

```javascript
const dg = require("dg-dom");

var content = ["h1", "Hello World"];

// Generates the DOM element h1 having the innerHtml "Hello World"
domElement = dg.render(content);

// Generates the following string "<h1>Hello World</h1>"
htmlString = dg.renderString(content);
```

### Syntax

### Installation

DOM Generator should work on any nodejs version and browser.

To install run the following:

```sh
$ npm install dg-dom
```

### Todos

 - Write MORE Tests
 - Improve the documentation

License
----

MIT

**Free Software, Hell Yeah!**
