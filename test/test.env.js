/* global require, describe, it, beforeEach, after */
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

	beforeEach( function before() {
		delete process.env[ 'API_KEY' ];
		delete process.env[ 'PORT' ];
		delete process.env[ 'LOG_LEVEL' ];
		delete process.env[ 'STR' ];
		delete process.env[ 'NUM' ];
		delete process.env[ 'BOOL' ];
		delete process.env[ 'OBJ' ];
	});

	after( function foo() {
		delete process.env[ 'API_KEY' ];
		delete process.env[ 'PORT' ];
		delete process.env[ 'LOG_LEVEL' ];
		delete process.env[ 'STR' ];
		delete process.env[ 'NUM' ];
		delete process.env[ 'BOOL' ];
		delete process.env[ 'OBJ' ];
	});

	it( 'should export a function', function test() {
		expect( env ).to.be.a( 'function' );
	});

	it( 'should return `null` if a mapping file does not exist', function test() {
		assert.isNull( env( 'beep', 'boop.json' ) );
	});

	it( 'should return a configuration object', function test() {
		var expected,
			actual;

		expected = {
			'akey': '1234',
			'server': {
				'port': 7331
			},
			'logger': {
				'level': 'info'
			}
		};

		process.env[ 'API_KEY' ] = '1234';
		process.env[ 'PORT' ] = '7331';
		process.env[ 'LOG_LEVEL' ] = 'info';

		actual = env( fixtures, 'env.json' );

		assert.deepEqual( actual, expected );
	});

	it( 'should parse numbers', function test() {
		var expected,
			actual;

		process.env[ 'NUM' ] = '1234';

		expected = {
			'num': 1234
		};

		actual = env( fixtures, 'env.json' );

		assert.deepEqual( actual, expected );
	});

	it( 'should throw an error if unable to parse an environment variable specified as a number', function test() {
		process.env[ 'NUM' ] = 'true';
		expect( badValue ).to.throw( TypeError );
		function badValue() {
			env( fixtures, 'env.json' );
		}
	});

	it( 'should parse booleans', function test() {
		var expected,
			values,
			actual,
			ch,
			i;

		values = [
			'true',
			'TRUE',
			'True',
			'T',
			't',
			'false',
			'FALSE',
			'False',
			'F',
			'f'
		];

		expected = {
			'bool': null
		};

		for ( i = 0; i < values.length; i++ ) {
			ch = values[ i ][ 0 ].toLowerCase();
			process.env[ 'BOOL' ] = values[ i ];
			actual = env( fixtures, 'env.json' );
			expected.bool = ( ch === 't' ) ? true : false;
			assert.deepEqual( actual, expected, values[ i ] );
		}
	});

	it( 'should throw an error if unable to parse an environment variable specified as a boolean', function test() {
		process.env[ 'BOOL' ] = 'beepboop';
		expect( badValue ).to.throw( TypeError );
		function badValue() {
			env( fixtures, 'env.json' );
		}
	});

	it( 'should parse objects', function test() {
		var expected,
			actual;

		process.env[ 'OBJ' ] = '{"beep":"boop"}';

		expected = {
			'obj': {
				'beep': 'boop'
			}
		};

		actual = env( fixtures, 'env.json' );

		assert.deepEqual( actual, expected );
	});

	it( 'should throw an error if unable to parse an environment variable specified as an object', function test() {
		process.env[ 'OBJ' ] = '{"beep:"boop"}';
		expect( badValue ).to.throw( TypeError );
		function badValue() {
			env( fixtures, 'env.json' );
		}
	});

});
