'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' ),
	isStringArray = require( 'validate.io-string-array' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} [options.local] - local application configuration directory
* @param {String} [options.defaultsFile] - basename of a file within the local application configuration directory which contains default application settings
* @param {String} [options.etc] - application configuration directory
* @param {String} [options.etcFile] - basename of a file within the application configuration directory which contains application settings
* @param {String} [options.user] - user configuration directory
* @param {String} [options.userFile] - basename of a file within the user configuration directory which contains user application settings
* @param {String} [options.userFormat] - format specifying how to parse a user configuration file
* @param {String} [options.env] - application runtime environment
* @param {String} [options.envFile] - basename of a file within the application configuration directory which maps environment variables to application settings
* @param {String} [options.argvFile] - basename of a file within the local application configuration directory which maps command-line arguments to application settings
* @param {String[]} [options.order] - defines the configuration hierarchy
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'local' ) ) {
		opts.local = options.local;
		if ( !isString( opts.local ) ) {
			return new TypeError( 'invalid option. `local` option must be a string primitive. Option: `' + opts.local + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'defaultsFile' ) ) {
		opts.defaultsFile = options.defaultsFile;
		if ( !isString( opts.defaultsFile ) ) {
			return new TypeError( 'invalid option. `defaultsFile` option must be a string primitive. Option: `' + opts.defaultsFile + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'etc' ) ) {
		opts.etc = options.etc;
		if ( !isString( opts.etc ) ) {
			return new TypeError( 'invalid option. `etc` option must be a string primitive. Option: `' + opts.etc + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'etcFile' ) ) {
		opts.etcFile = options.etcFile;
		if ( !isString( opts.etcFile ) ) {
			return new TypeError( 'invalid option. `etcFile` option must be a string primitive. Option: `' + opts.etcFile + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'user' ) ) {
		opts.user = options.user;
		if ( !isString( opts.user ) ) {
			return new TypeError( 'invalid option. `user` option must be a string primitive. Option: `' + opts.user + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'userFile' ) ) {
		opts.userFile = options.userFile;
		if ( !isString( opts.userFile ) ) {
			return new TypeError( 'invalid option. `userFile` option must be a string primitive. Option: `' + opts.userFile + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'userFormat' ) ) {
		opts.userFormat = options.userFormat;
		if ( !isString( opts.userFormat ) ) {
			return new TypeError( 'invalid option. `userFormat` option must be a string primitive. Option: `' + opts.userFormat + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'env' ) ) {
		opts.env = options.env;
		if ( !isString( opts.env ) ) {
			return new TypeError( 'invalid option. `env` option must be a string primitive. Option: `' + opts.env + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'envFile' ) ) {
		opts.envFile = options.envFile;
		if ( !isString( opts.envFile ) ) {
			return new TypeError( 'invalid option. `envFile` option must be a string primitive. Option: `' + opts.envFile + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'argvFile' ) ) {
		opts.argvFile = options.argvFile;
		if ( !isString( opts.argvFile ) ) {
			return new TypeError( 'invalid option. `argvFile` option must be a string primitive. Option: `' + opts.argvFile + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'order' ) ) {
		opts.order = options.order;
		if ( !isStringArray( opts.order ) ) {
			return new TypeError( 'invalid option. `order` option must be a string array. Option: `' + opts.order + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
