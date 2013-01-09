var helper = require('./helper'),
    assert = helper.assert,
    debug = helper.debug;

var Compressor = require('..'),
    compressor = new Compressor();

// -----------------------
//  Test
// --------------------

module.exports = {

  'Snappy': {
    'new': {
      '()': function() {
        assert.instanceOf ( compressor, require('..') );

        Compressor.reset();

        var compressor2 = new Compressor();

        assert.equal ( compressor2.url, null );
        assert.typeOf ( compressor2.options, 'object' );
        assert.deepEqual ( compressor2.options.custom, undefined );
      },

      '(options)': function() {
        Compressor.reset();

        var compressor2 = new Compressor({custom: {foo: 'bar'}});

        assert.equal ( compressor2.url, null );
        assert.typeOf ( compressor2.options, 'object' );
        assert.deepEqual ( compressor2.options.custom, {foo: 'bar'} );
      }
    },

    '.klass': function() {
      assert.property ( compressor, 'klass' );
      assert.equal ( compressor.klass, Compressor );
    },

    '.defaults': function() {
      assert.property ( Compressor, 'defaults' );

      assert.equal ( Compressor.defaults.url, null );
      assert.typeOf ( Compressor.defaults.options, 'object' );
    },

    '.options': function() {
      assert.property ( Compressor, 'options' );
      assert.typeOf ( Compressor.options, 'object' );
      assert.deepEqual ( Compressor.options, {encoding: 'utf8'} );
    },

    '.reset()': function() {
      assert.property ( Compressor, 'reset' );
      assert.typeOf ( Compressor.reset, 'function' );

      Compressor.options = {foo: "bar"};
      assert.deepEqual ( Compressor.options, {foo: "bar"} );

      Compressor.reset();

      assert.equal ( Compressor.url, null );
    }
  },

  'Snappy.prototype': {
    '#options': function() {
      assert.property ( compressor, 'options' );
      assert.typeOf ( compressor.options, 'object' );
    },

    '#engine': function() {
      assert.property ( compressor, 'engine' );
      assert.equal ( compressor.engine, require('snappy') );
    },

    '#binary': function() {
      assert.property ( compressor, 'binary' );
      assert.equal ( compressor.binary, true );
    },

    '#compress': {
      '': function() {
        assert.property ( compressor, 'compress' );
        assert.typeOf ( compressor.compress, 'function' );
      },

      '(uncompressed string)': function() {
        var input = JSON.stringify({_id: 1, a: "foo", b: "bar"});

        assert.deepEqual ( compressor.compress(input), require('snappy').compressSync(input) );
      },

      '(uncompressed object)': function() {
        var input = {_id: 1, a: "foo", b: "bar"};

        assert.deepEqual ( compressor.compress(input), require('snappy').compressSync(input) );
      }
    },

    '#decompress': {
      '': function() {
        assert.property ( compressor, 'decompress' );
        assert.typeOf ( compressor.decompress, 'function' );
      },

      '(compressed string)': function() {
        var input = JSON.stringify({_id: 1, a: "foo", b: "bar"});
        var compressed = require('snappy').compressSync(input);

        assert.deepEqual ( compressor.decompress(compressed), require('snappy').decompressSync(compressed) );
      },

      '(compressed object)': function() {
        var input = {_id: 1, a: "foo", b: "bar"};
        var compressed = require('snappy').compressSync(new Buffer(JSON.stringify(input)));

        assert.deepEqual ( compressor.decompress(compressed), require('snappy').decompressSync(compressed) );
      }
    }
  }

};
