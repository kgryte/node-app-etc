'use strict';

// MODULES //

var fs = require( 'fs' ),
	path = require( 'path' ),
	extname = require( 'utils-extname' ),
	cwd = require( 'utils-cwd' ),
	parsers = require( './../parsers' );


// LOAD //

/**
* FUNCTION: load( file )
*	Loads a configuration file.
*
* @param {String} file - file path
* @returns {Object} configuration object
*/
function load( file ) {
	var config,
		parse,
		exts,
		ext;

	ext = extname( file );
	parse = parsers( ext );
	if ( parse === null ) {
		exts = parsers.exts().join( ',' );
		throw new Error( 'invalid input argument. Input argument has an unrecognized/unsupported file extension: `' + ext + '`. Supported extensions: [' + exts + '].' );
	}
	file = path.resolve( cwd(), file );
	file = fs.readFileSync( file, {
		'encoding': 'utf8'
	});
	config = parse( file );
	if ( config instanceof Error ) {
		throw config;
	}
	return config;
} // end FUNCTION load()


// EXPORTS //

module.exports = load;
