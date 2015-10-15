/* global require, describe, it, beforeEach, after */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	etc = require( './../lib/etc.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'etc', function tests() {

	var fixtures;

	fixtures = path.join( __dirname, 'fixtures' );

	beforeEach( function before() {
		delete process.env[ 'BEEP' ];
	});

	after( function foo() {
		delete process.env[ 'BEEP' ];
	});

	it( 'should export a function', function test() {
		expect( etc ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			etc({
				'local': 1234
			});
		}
	});

	it( 'should load a configuration file containing defaults', function test() {
		var expected,
			config;

		// Search for a `defaults` file:
		config = etc({
			'local': fixtures,
			'order': [
				'defaults'
			]
		});
		expected = {
			'beep': 'woot'
		};
		assert.deepEqual( config.get(), expected );

		// Explicitly state the `defaults` file:
		config = etc({
			'local': fixtures,
			'defaultsFile': 'defaults2.alce',
			'order': [
				'defaults'
			]
		});
		expected = {
			'beep': 'boom'
		};
		assert.deepEqual( config.get(), expected );
	});

	it( 'should load an application-specific configuration file', function test() {
		var expected,
			config,
			env;

		env = process.env[ 'NODE_ENV' ];
		delete process.env[ 'NODE_ENV' ];

		config = etc({
			'etc': fixtures,
			'etcFile': 'app',
			'order': [
				'app'
			]
		});
		expected = {
			'beep': 'bebopboop'
		};
		assert.deepEqual( config.get(), expected );

		process.env[ 'NODE_ENV' ] = env;
	});

	it( 'should load a local application-specific configuration file', function test() {
		var expected,
			config,
			env;

		env = process.env[ 'NODE_ENV' ];
		delete process.env[ 'NODE_ENV' ];

		config = etc({
			'local': fixtures,
			'env': 'local',
			'order': [
				'local'
			]
		});
		expected = {
			'beep': 'hello'
		};
		assert.deepEqual( config.get(), expected );

		process.env[ 'NODE_ENV' ] = env;
	});

	// TODO:
	it( 'should load a user-specific configuration file' );

	it( 'should load environment variables', function test() {
		var expected,
			config;

		process.env[ 'BEEP' ] = 'yoyo';

		config = etc({
			'local': fixtures,
			'envFile': 'env.json',
			'order': [
				'env'
			]
		});

		expected = {
			'beep': 'yoyo'
		};

		assert.deepEqual( config.get(), expected );
	});

	it( 'should ignore non-existent configuration sources', function test() {
		var expected,
			config;

		config = etc({
			'local': fixtures,
			'env': 'beepboopbebop',
			'order': [
				'local'
			]
		});
		expected = {};
		assert.deepEqual( config.get(), expected );

		config = etc({
			'local': fixtures,
			'order': [
				'unknown_unsupported_source'
			]
		});
		expected = {};
		assert.deepEqual( config.get(), expected );
	});

	it( 'should load configuration files according to a default hierarchy: defaults < app < local < user < env', function test() {
		var expected,
			config,
			env;

		env = process.env[ 'NODE_ENV' ];
		delete process.env[ 'NODE_ENV' ];

		// No environment variable set:
		config = etc({
			'local': fixtures,
			'env': 'local'
		});

		expected = {
			'beep': 'hello'
		};

		assert.deepEqual( config.get(), expected );

		// Set an environment variable:
		process.env[ 'BEEP' ] = 'yoyo';

		config = etc({
			'local': fixtures,
			'env': 'local'
		});

		expected = {
			'beep': 'yoyo'
		};

		assert.deepEqual( config.get(), expected );

		delete process.env[ 'BEEP' ];

		// Clean-up:
		process.env[ 'NODE_ENV' ] = env;

	});

	it( 'should load configuration files according to a specified hierarchy', function test() {
		var expected,
			config,
			env;

		env = process.env[ 'NODE_ENV' ];
		delete process.env[ 'NODE_ENV' ];

		process.env[ 'BEEP' ] = 'yoyo';

		// Default:
		config = etc({
			'local': fixtures,
			'env': 'local',
			'order': [
				'defaults',
				'local',
				'env'
			]
		});

		expected = {
			'beep': 'yoyo'
		};

		assert.deepEqual( config.get(), expected );

		// Specified:
		config = etc({
			'local': fixtures,
			'env': 'local',
			'order': [
				'defaults',
				'env',
				'local'
			]
		});

		expected = {
			'beep': 'hello'
		};

		assert.deepEqual( config.get(), expected );

		// Clean-up:
		delete process.env[ 'BEEP' ];
		process.env[ 'NODE_ENV' ] = env;

	});

	it( 'should return an empty config if unable to locate configuration files', function test() {
		var config = etc();

		// Root of this module does not have an `./etc` directory...
		assert.deepEqual( config.get(), {} );
	});

});
