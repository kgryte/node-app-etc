'use strict';

// MODULES //

var fs = require( 'fs' ),
	path = require( 'path' ),
	extname = require( 'utils-extname' ),
	load = require( './../load' ),
	parsers = require( './../parsers' );


// CONFIG //

/**
* FUNCTION: config( dir, basename )
*	Loads a configuration file.
*
* @param {String} dir - configuration directory
* @param {String} basename - file basename
* @returns {Object|Null} configuration object or null
*/
function config( dir, basename ) {
	var exts,
		file,
		ext,
		len,
		i;

	ext = extname( basename );
	if ( ext ) {
		file = path.resolve( dir, basename );
		if ( fs.existsSync( file ) ) {
			return load( file );
		}
	} else {
		exts = parsers.exts();
		len = exts.length;
		for ( i = 0; i < len; i++ ) {
			file = basename + exts[ i ];
			file = path.resolve( dir, file );
			if ( fs.existsSync( file ) ) {
				return load( file );
			}
		}
	}
	return null;
} // end FUNCTION config()


// EXPORTS //

module.exports = config;
