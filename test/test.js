/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	etc = require( './../lib' );


// VARIABLES //

var expect = chai.expect;


// TESTS //

describe( 'app-etc', function tests() {

	it( 'should export a function', function test() {
		expect( etc ).to.be.a( 'function' );
	});

	it( 'should export a function to get/set a parser', function test() {
		expect( etc.parser ).to.be.a( 'function' );
	});

});
