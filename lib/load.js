'use strict';

// MODULES //

var debug = require( 'debug' )( 'app-etc:load' ),
	path = require( 'path' ),
	extname = require( 'utils-extname' ),
	exists = require( 'utils-fs-exists' ).sync,
	load = require( 'app-etc-load' );


// FUNCTIONS //

/**
* FUNCTION: resolve( dir, basename )
*	Attempts to resolve a file and its hidden version.
*
* @private
* @param {String} dir - configuration directory
* @param {String} basename - file basename
* @returns {Object|Null} configuration object or null
*/
function resolve( dir, basename ) {
	var file;
	if ( basename[ 0 ] !== '.' ) {
		file = path.resolve( dir, '.'+basename );
		if ( exists( file ) ) {
			debug( 'Found a configuration file: %s', file );
			return load( file );
		}
	}
	file = path.resolve( dir, basename );
	if ( exists( file ) ) {
		debug( 'Found a configuration file: %s', file );
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
		file = resolve( dir, basename );
		if ( file !== null ) {
			debug( 'Loaded a configuration file from `%s` directory with basename `%s`.', dir, basename );
			return file;
		}
	} else {
		exts = load.exts();
		len = exts.length;
		for ( i = 0; i < len; i++ ) {
			file = basename + exts[ i ];
			file = resolve( dir, file );
			if ( file !== null ) {
				debug( 'Loaded a configuration file from `%s` directory with basename `%s`.', dir, basename );
				return file;
			}
		}
	}
	debug( 'No configuration file found in directory `%s` with basename `%s`.', dir, basename );
	return null;
} // end FUNCTION loadFile()


// EXPORTS //

module.exports = loadFile;
