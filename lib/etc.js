'use strict';

// MODULES //

var path = require( 'path' ),
	merge = require( 'utils-merge2' )(),
	root = require( 'resolve-app-path' )(),
	pkg = require( 'resolve-app-pkginfo' ).sync(),
	createConfig = require( 'app-etc-config' ),
	validate = require( './validate.js' ),
	load = require( './load.js' ),
	envVars = require( './env.js' );


// VARIABLES //

var DEFAULTS = require( './defaults.json' );


// ETC //

/**
* FUNCTION: etc( [options] )
*	Returns an application configuration.
*
* @param {Object} [options] - function options
* @param {String} [options.etc='./etc'] - application configuration directory
* @param {String} [options.defaultsFile='defaults'] - basename of a file within the application configuration directory which contains default application settings
* @param {String} [options.user] - user configuration directory
* @param {String} [options.userFile] - basename of a file within the user configuration directory which contains user application settings
* @param {String} [options.env='dev'] - application runtime environment
* @param {String} [options.envFile='env'] - basename of a file within the application configuration directory which maps environment variables to application settings
* @param {String[]} [options.order=['defaults','user','app','env']] - defines the configuration hierarchy
* @returns {Config} new Config instance
*/
function etc( options ) {
	var config,
		opts,
		cdir,
		obj,
		err,
		env,
		x,
		i;

	opts = {};
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	opts = merge( {}, DEFAULTS, opts );

	// Get the current runtime environment:
	env = process.env.NODE_ENV || opts.env;

	// Resolve the configuration directory:
	cdir = path.resolve( root, opts.etc );

	// Create a new application configuration:
	config = createConfig();

	// Load configuration files...
	for ( i = 0; i < opts.order.length; i++ ) {
		x = opts.order[ i ];
		obj = null;
		if ( x === 'defaults' ) {
			obj = load( cdir, opts.defaultsFile );
		}
		else if ( x === 'user' ) {
			// TODO: OS specific config dirs
			// obj = load( opts.user || null, opts.userFile || pkg.name );
		}
		else if ( x === 'app' ) {
			obj = load( cdir, env );
		}
		else if ( x === 'env' ) {
			obj = envVars( cdir, opts.envFile );
		}
		if ( obj ) {
			config.merge( obj );
		}
	}
	return config;
} // end FUNCTION etc()


// EXPORTS //

module.exports = etc;
