/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	env = require( './../lib/env.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'env', function tests() {

	var fixtures;

	fixtures = path.join( __dirname, 'fixtures' );


	it( 'should export a function', function test() {
		expect( env ).to.be.a( 'function' );
	});

	it( 'should return `null` if a mapping file does not exist', function test() {
		assert.isNull( env( 'beep', 'boop.json' ) );
	});

	it( 'should return a configuration object', function test() {
		var expected,
			actual,
			o;

		expected = {
			'akey': '1234',
			'server': {
				'port': 7331
			},
			'logger': {
				'level': 'info'
			},
			'bool': true,
			'obj': {
				'hello': 'world'
			},
			'arr': [ 1, 2, 3, '4' ]
		};

		o = process.env;
		process.env = {
			'API_KEY': '1234',
			'PORT': '7331',
			'LOG_LEVEL': 'info',
			'BOOL': 'TRUE',
			'OBJ': '{"hello":"world"}',
			'ARR': '[1,2,3,"4"]'
		};

		actual = env( fixtures, 'env.json' );

		assert.deepEqual( actual, expected );

		process.env = o;
	});

	it( 'should throw an error if unable to parse an environment variable as a specified type', function test() {
		var o = process.env;
		process.env = {
			'PORT': 'beep'
		};
		expect( badValue ).to.throw( TypeError );
		process.env = o;
		function badValue() {
			env( fixtures, 'env.json' );
		}
	});

});
