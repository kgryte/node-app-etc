/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	load = require( './../lib/load.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'load', function tests() {

	var fixtures,
		expected;

	fixtures = path.join( __dirname, 'fixtures' );

	expected = {
		'server': {
			'port': 7331
		},
		'logger': {
			'level': 'info'
		}
	};

	it( 'should export a function', function test() {
		expect( load ).to.be.a( 'function' );
	});

	it( 'should load a configuration file', function test() {
		var config = load( fixtures, 'config.yml' );
		assert.deepEqual( config, expected );
	});

	it( 'should search for and load a configuration file when provided a file basename which does not have an extension', function test() {
		var config = load( fixtures, 'config' );
		assert.deepEqual( config, expected );
	});

	it( 'should return `null` if a configuration file does not exist', function test() {
		assert.isNull( load( fixtures, 'beepboopbebop' ) );
		assert.isNull( load( fixtures, 'beepboopbebop.toml' ) );
	});

});
