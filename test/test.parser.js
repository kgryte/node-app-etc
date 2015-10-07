/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	noop = require( '@kgryte/noop' ),
	parser = require( './../lib/parser.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'parser', function tests() {

	it( 'should export a function', function test() {
		expect( parser ).to.be.a( 'function' );
	});

	it( 'should return a parser', function test() {
		assert.isFunction( parser( '.json' ) );
		assert.isFunction( parser( 'json' ) );
	});

	it( 'should return `null` if a parser does not exist', function test() {
		assert.isNull( parser( 'abcdefg' ) );
	});

	it( 'should set a parser', function test() {
		parser( '.beep', noop );
		assert.strictEqual( parser( '.beep' ), noop );

		parser( 'boop', noop );
		assert.strictEqual( parser( '.boop' ), noop );
	});

});
