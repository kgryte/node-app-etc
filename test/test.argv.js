/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	argv = require( './../lib/argv.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'argv', function tests() {

	var fixtures;

	fixtures = path.join( __dirname, 'fixtures' );


	it( 'should export a function', function test() {
		expect( argv ).to.be.a( 'function' );
	});

	it( 'should return `null` if a mapping file does not exist', function test() {
		assert.isNull( argv( 'beep', 'boop.json' ) );
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

		o = process.argv;
		process.argv = [
			null,
			null,
			'--api-key=1234',
			'-p',
			'7331',
			'--loglevel',
			'info',
			'--bool',
			'--obj={"hello":"world"}',
			'--arr',
			'[1,2,3,"4"]'
		];

		actual = argv( fixtures, 'argv.json' );

		assert.deepEqual( actual, expected );

		process.argv = o;
	});

	it( 'should throw an error if unable to parse a command-line argument as a specified type', function test() {
		var o = process.argv;
		process.argv = [
			null,
			null,
			'-p=beep'
		];
		expect( badValue ).to.throw( TypeError );
		process.argv = o;
		function badValue() {
			argv( fixtures, 'argv.json' );
		}
	});

});
