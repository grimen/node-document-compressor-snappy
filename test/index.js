
var Compressor = require('../../node-document-compressor');

module.exports = Compressor.Spec('Snappy', {
  module: require('..'),
  engine: require('snappy'),
  options: {encoding: 'utf8'},
  pack: require('snappy').compressSync,
  unpack: require('snappy').decompressSync,
  binary: true
});
