/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not a function', function test() {
		var values,
			err,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, values[ i ], values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `local` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'local': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an `etc` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'etc': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `defaultsFile` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'defaultsFile': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an `etc` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'etc': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an `etcFile` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'etcFile': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `user` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'user': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `userFile` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'userFile': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an `env` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'env': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an `envFile` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'envFile': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an `order` option which is not a string array', function test() {
		var values,
			err,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			['beep',null],
			[1,2,3],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'order': values[ i ]
			}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return `null` if all options are valid', function test() {
		var opts,
			err;

		opts = {
			'local': './config',
			'defaultsFile': 'configgie.json',
			'etc': '/etc',
			'etcFile': 'appie/config.toml',
			'user': '/Users/bbop/Library/Preferences',
			'userFile': 'appie.toml',
			'env': 'local',
			'envFile': 'env_mapping.json',
			'order': [
				'app',
				'env'
			]
		};

		err = validate( {}, opts );
		assert.isNull( err );

		// Unrecognized options:
		opts = {
			'beep': 'boop'
		};

		err = validate( {}, opts );
		assert.isNull( err );
	});

});
