# NODE-DOCUMENT-COMPRESSOR-SNAPPY [![Build Status](https://secure.travis-ci.org/grimen/node-document-compressor-snappy.png)](http://travis-ci.org/grimen/node-document-compressor-snappy)

**Compressor** adapter [snappy](https://github.com/kesla/node-snappy) for [node-document](https://github.com/grimen/node-document) ODM for Node.js.


## Installation

```shell
  $ npm install node-document-compressor-snappy
```


## Usage

**Basic:**

```javascript
  var Compressor = require('node-document-compressor-snappy');

  var Compressor = require('..');

  var compressor = new Compressor();

  var object = {foo: "bar"}, data;

  console.log("Object: ", require('util').inspect(object), typeof object);

  data = compressor.compress(object);

  console.log("Compressed: ", require('util').inspect(data), typeof data);

  object = compressor.decompress(data);

  console.log("Decompressed: ", require('util').inspect(object), typeof object);
```

For details; see [node-document](https://github.com/grimen/node-document).


## Test

**Local tests:**

```shell
  $ make test
```


## License

Released under the MIT license.

Copyright (c) [Jonas Grimfelt](http://github.com/grimen)
