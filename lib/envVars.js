'use strict';

// MODULES //

var fs = require( 'fs' ),
	path = require( 'path' ),
	deepSet = require( 'utils-deep-set' ),
	extname = require( 'utils-extname' ),
	parsers = require( './../parsers' ),
	load = require( './../load' );


// ENVIRONMENT VARIABLES //

/**
* FUNCTION: envVars( dir, basename )
*	Creates a configuration object from environment variables.
*
* @param {String} dir - configuration directory
* @param {String} basename - basename of file containing environment variable mappings
* @returns {Object|Null} configuration object or null
*/
function envVars( dir, basename ) {
	var file,
		keys,
		exts,
		obj,
		out,
		ext,
		len,
		key,
		val,
		i;

	ext = extname( basename );
	if ( ext ) {
		file = path.resolve( dir, basename );
		if ( fs.existsSync( file ) ) {
			obj = load( file );
		}
	} else {
		exts = parsers.exts();
		len = exts.length;
		for ( i = 0; i < len; i++ ) {
			file = basename + exts[ i ];
			file = path.resolve( dir, file );
			if ( fs.existsSync( file ) ) {
				obj = load( file );
				break;
			}
		}
	}
	if ( obj ) {
		keys = Object.keys( obj );
		len = keys.length;
		out = {};
		for ( i = 0; i < len; i++ ) {
			key = obj[ keys[ i ] ];
			val = process.env[ keys[ i ] ];
			if ( val !== void 0 ) {
				deepSet( out, key, val, {
					'create': true
				});
			}
		}
		return out;
	}
	return null;
} // end FUNCTION envVars()


// EXPORTS //

module.exports = envVars;
