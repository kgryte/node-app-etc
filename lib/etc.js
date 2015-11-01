'use strict';

// MODULES //

var debug = require( 'debug' )( 'app-etc:main' ),
	path = require( 'path' ),
	merge = require( 'utils-merge2' )(),
	root = require( 'resolve-app-path' )(),
	pkg = require( 'resolve-app-pkginfo' ).sync(),
	createConfig = require( 'app-etc-config' ),
	user = require( 'find-user-app-config' ),
	validate = require( './validate.js' ),
	load = require( './load.js' ),
	envVars = require( './env.js' ),
	argv = require( './argv.js' );


// VARIABLES //

var DEFAULTS = require( './defaults.json' );


// ETC //

/**
* FUNCTION: etc( [options] )
*	Returns an application configuration.
*
* @param {Object} [options] - function options
* @param {String} [options.local='./etc'] - local application configuration directory
* @param {String} [options.defaultsFile='defaults'] - basename of a file within the local application configuration directory which contains default application settings
* @param {String} [options.schemaFile] - basename of a file within the local application configuration directory which contains a configuration schema
* @param {String} [options.etc="/etc"] - application configuration directory
* @param {String} [options.etcFile] - basename of a file within the application configuration directory which contains application settings
* @param {String} [options.user] - user configuration directory
* @param {String} [options.userFile] - basename of a file within the user configuration directory which contains user application settings
* @param {String} [options.userFormat] - format specifying how to parse a user configuration file
* @param {String} [options.env='dev'] - application runtime environment
* @param {String} [options.envFile='env'] - basename of a file within the local application configuration directory which maps environment variables to application settings
* @param {String} [options.argvFile='argv'] - basename of a file within the local application configuration directory which maps command-line arguments to application settings
* @param {String[]} [options.order=['defaults','app','local','user','env','argv']] - defines the configuration hierarchy
* @returns {Config} new Config instance
*/
function etc( options ) {
	var config,
		schema,
		fname,
		uopts,
		opts,
		ldir,
		obj,
		err,
		env,
		out,
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
	debug( 'Configuration options: %s', JSON.stringify( opts ) );

	// Get the current runtime environment:
	env = process.env.NODE_ENV || opts.env;
	debug( 'Runtime environment: %s', env );

	// Resolve the local configuration directory:
	ldir = path.resolve( root, opts.local );
	debug( 'Local configuration directory: %s', ldir );

	// Attempt to load a configuration schema...
	if ( opts.schemaFile ) {
		debug( 'Attempting to load a configuration schema.' );
		schema = load( ldir, opts.schemaFile );
		if ( !schema ) {
			debug( 'Unable to load a configuration schema. Ensure that a schema file exists and that the file is an accepted format.' );
		}
	}
	// Create a new application configuration...
	if ( schema ) {
		config = createConfig({
			'schema': schema
		});
	} else {
		config = createConfig();
	}
	// Load configuration files...
	debug( 'Loading configuration files.' );
	for ( i = 0; i < opts.order.length; i++ ) {
		x = opts.order[ i ];
		obj = null;
		if ( x === 'defaults' ) {
			debug( 'Attempting to load default configuration settings.' );
			obj = load( ldir, opts.defaultsFile );
		}
		else if ( x === 'app' ) {
			debug( 'Attempting to load application-specific configuration settings.' );
			fname = opts.etcFile || pkg.name;
			obj = load( opts.etc, fname );
		}
		else if ( x === 'local' ) {
			debug( 'Attempting to load local application-specific configuration settings.' );
			obj = load( ldir, env );
		}
		else if ( x === 'user' ) {
			debug( 'Attempting to load user-specific configuration settings.' );
			uopts = {};
			if ( opts.user ) {
				uopts.dir = opts.user;
			}
			if ( opts.userFile ) {
				uopts.basename = opts.userFile;
			}
			if ( opts.userFormat ) {
				uopts.fmt = opts.userFormat;
			}
			obj = user( uopts );
		}
		else if ( x === 'env' ) {
			debug( 'Attempting to load environment variables.' );
			obj = envVars( ldir, opts.envFile );
		}
		else if ( x === 'argv' ) {
			debug( 'Attempting to load command-line arguments.' );
			obj = argv( ldir, opts.argvFile );
		}
		if ( obj ) {
			debug( 'Merging `%s` configuration settings.', x );
			config.merge( obj );
		}
	}
	debug( 'Finished loading configuration files.' );

	if ( schema ) {
		debug( 'Validating configuration.' );
		out = config.validate();
		if ( out !== true ) {
			throw new Error( 'invalid configuration. Encountered the following errors during validation: ' + JSON.stringify( out ) + '.' );
		}
		debug( 'Configuration is valid.' );
	}
	debug( 'Done.' );
	return config;
} // end FUNCTION etc()


// EXPORTS //

module.exports = etc;
