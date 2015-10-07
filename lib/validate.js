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
* @param {String} [options.etc] - application configuration directory
* @param {String} [options.defaultsFile] - basename of a file within the application configuration directory which contains default application settings
* @param {String} [options.user] - user configuration directory
* @param {String} [options.userFile] - basename of a file within the user configuration directory which contains user application settings
* @param {String} [options.env] - application runtime environment
* @param {String} [options.envFile] - basename of a file within the application configuration directory which maps environment variables to application settings
* @param {String[]} [options.order] - defines the configuration hierarchy
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'etc' ) ) {
		opts.etc = options.etc;
		if ( !isString( opts.etc ) ) {
			return new TypeError( 'invalid option. `etc` option must be a primitive string. Option: `' + opts.etc + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'defaultsFile' ) ) {
		opts.defaultsFile = options.defaultsFile;
		if ( !isString( opts.defaultsFile ) ) {
			return new TypeError( 'invalid option. `defaultsFile` option must be a primitive string. Option: `' + opts.defaultsFile + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'user' ) ) {
		opts.user = options.user;
		if ( !isString( opts.user ) ) {
			return new TypeError( 'invalid option. `user` option must be a primitive string. Option: `' + opts.user + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'userFile' ) ) {
		opts.userFile = options.userFile;
		if ( !isString( opts.userFile ) ) {
			return new TypeError( 'invalid option. `userFile` option must be a primitive string. Option: `' + opts.userFile + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'env' ) ) {
		opts.env = options.env;
		if ( !isString( opts.env ) ) {
			return new TypeError( 'invalid option. `env` option must be a primitive string. Option: `' + opts.env + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'envFile' ) ) {
		opts.envFile = options.envFile;
		if ( !isString( opts.envFile ) ) {
			return new TypeError( 'invalid option. `envFile` option must be a primitive string. Option: `' + opts.envFile + '`.' );
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
