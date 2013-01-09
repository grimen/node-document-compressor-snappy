require('sugar');
var util = require('util');

// HACK: ...until Node.js `require` supports `instanceof` on modules loaded more than once. (bug in Node.js)
var Compressor = global.NodeDocumentCompressor || (global.NodeDocumentCompressor = require('node-document-compressor'));

// -----------------------
//  DOCS
// --------------------
//  - https://github.com/kesla/node-snappy

// -----------------------
//  Constructor
// --------------------

// new Snappy ()
// new Snappy (options)
function Snappy () {
  var self = this

  self.klass = Snappy;
  self.klass.super_.apply(self, arguments);

  self.engine = require('snappy');
  self.binary = true;
}

util.inherits(Snappy, Compressor);

// -----------------------
//  Class
// --------------------

Snappy.defaults = {
  options: {
    encoding: 'utf8'
  }
};

Snappy.options = Object.clone(Snappy.defaults.options, true);

Snappy.reset = Compressor.reset;

// -----------------------
//  Instance
// --------------------

// #compress (object)
Snappy.prototype.compress = function(object, encoding) {
  var self = this, data;

   // REVIEW: Always expect `Buffer`?
  if (typeof object !== 'string') {
    object = JSON.stringify(object);
  }

  // object = new Buffer(object, encoding || self.options.encoding);

  try {
    data = self.engine.compressSync(object);

  } catch (err) {
    err.name = "Compression: " + err.name;
    err.message = err.message + "  =>  " + util.inspect(data);
    throw err;
  }

  return data;
};

// #decompress (data)
Snappy.prototype.decompress = function(data, encoding) {
  var self = this, object;

  try {
    object = self.engine.decompressSync(data);

    // REVIEW: Always return `Buffer`?
    // if (typeof object !== 'string') {
    //   object = JSON.parse(object.toString(encoding || self.options.encoding));
    // }

  } catch (err) {
    err.name = "Decompression: " + err.name;
    err.message = err.message + "  =>  " + util.inspect(data);
    throw err;
  }

  return object;
}

// -----------------------
//  Export
// --------------------

module.exports = Snappy;
