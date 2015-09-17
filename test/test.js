/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	etc = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'app-etc', function tests() {

	it( 'should export a function', function test() {
		expect( etc ).to.be.a( 'function' );
	});

});
