var Compressor = require('..');

var compressor = new Compressor();

var object = {foo: "bar"}, data;

console.log("Object: ", require('util').inspect(object), typeof object);

data = compressor.compress(object);

console.log("Compressed: ", require('util').inspect(data), typeof data);

object = compressor.decompress(data);

console.log("Decompressed: ", require('util').inspect(object), typeof object);
