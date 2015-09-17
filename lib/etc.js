'use strict';

// MODULES //

var path = require( 'path' ),
	resolve = require( 'resolve-app-path' ),
	merge = require( 'utils-merge2' )(),
	createConfig = require( './../config' ),
	appName = require( './appName.js' ),
	validate = require( './validate.js' ),
	fileConfig = require( './fileConfig.js' ),
	envVars = require( './envVars.js' );


// VARIABLES //

var DEFAULTS = require( './defaults.json' );


// ETC //

/**
* FUNCTION: etc( [options] )
*	Returns an application configuration.
*
* @param {Object} [options] - function options
* @returns {Config} new Config instance
*/
function etc( options ) {
	var config,
		opts,
		root,
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

	// Get the current environment:
	env = process.env.NODE_ENV || opts.env;

	// Resolve the application's root directory:
	root = resolve();

	// Resolve the configuration directory:
	cdir = path.resolve( root, opts.configDir );

	// Create a new application configuration:
	config = createConfig();

	// Load configuration files...
	for ( i = 0; i < opts.order.length; i++ ) {
		x = opts.order[ i ];
		if ( x === 'defaults' ) {
			obj = fileConfig( cdir, opts.defaultsFile );
		}
		else if ( x === 'user' ) {
			// TODO: OS specific config dirs
			obj = fileConfig( opts.userDir || null, opts.userFile || appName() );
		}
		else if ( x === 'env' ) {
			obj = fileConfig( cdir, env );
		}
		else if ( x === 'envvars' ) {
			obj = envVars( cdir, opts.envVarsFile );
		}
		if ( obj ) {
			config.merge( obj );
		}
	}
	return config;
} // end FUNCTION etc()


// EXPORTS //

module.exports = etc;
