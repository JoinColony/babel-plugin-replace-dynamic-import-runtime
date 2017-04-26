# Replace dynamic `import()` with `require()` at runtime

`babel-plugin-replace-dynamic-import-runtime`

Babel plugin to replace `import(...)` with `require(...)` at runtime, for node _(also works with `await import(...)`)_

## Use case

This has a very narrow use case: when you want to parse the same file for both `browser` and `node` _(using `babel`/`webpack`)_ and still be able to use `webpack`'s code splitting ability.

This is basically a utility to help reduce code duplication.

So statements like:
```javascript
...
const someDynamicImport = import('../path/to/your/module');
...
```
into a require statement that `node` can understand:
```javascript
const someDynamicImport = require('../path/to/your/module');
```


_**NOTE:** Babylon >= v6.12.0 is required to correct parse dynamic imports._

## Installation

```sh
yarn add babel-plugin-replace-dynamic-import-runtime --dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["replace-dynamic-import-runtime"]
}
```

### Via CLI

```sh
$ babel --plugins replace-dynamic-import-runtime script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['replace-dynamic-import-runtime']
});
```
