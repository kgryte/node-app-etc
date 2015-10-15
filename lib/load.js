'use strict';

// MODULES //

var path = require( 'path' ),
	extname = require( 'utils-extname' ),
	exists = require( 'utils-fs-exists' ),
	load = require( 'app-etc-load' );


// FUNCTIONS //

/**
* FUNCTION: resolve( dir, basename )
*	Attempts to resolve a file and its hidden version.
*
* @private
* @param {String} dir - configuration directory
* @param {String} basename - file basename
* @returns {String|Null} configuration object or null
*/
function resolve( dir, basename ) {
	var file;
	if ( basename[ 0 ] !== '.' ) {
		file = path.resolve( dir, '.'+basename );
		if ( exists.sync( file ) ) {
			return load( file );
		}
	}
	file = path.resolve( dir, basename );
	if ( exists.sync( file ) ) {
		return load( file );
	}
	return null;
} // end FUNCTION resolve()


// LOAD FILE //

/**
* FUNCTION: loadFile( dir, basename )
*	Loads a configuration file.
*
* @param {String} dir - configuration directory
* @param {String} basename - file basename
* @returns {Object|Null} configuration object or null
*/
function loadFile( dir, basename ) {
	var exts,
		file,
		ext,
		len,
		i;

	ext = extname( basename );
	if ( ext ) {
		return resolve( dir, basename );
	} else {
		exts = load.exts();
		len = exts.length;
		for ( i = 0; i < len; i++ ) {
			file = basename + exts[ i ];
			file = resolve( dir, file );
			if ( file !== null ) {
				return file;
			}
		}
	}
	return null;
} // end FUNCTION loadFile()


// EXPORTS //

module.exports = loadFile;
