'use strict';

// MODULES //

var fs = require( 'fs' ),
	path = require( 'path' ),
	resolve = require( 'resolve-app-path' );


// APP NAME //

/**
* FUNCTION: appName()
*	Returns an application's name.
*
* @returns {String} application name
*/
function appName() {
	var root,
		pkg;

	// TODO: sync and async versions

	// Resolve the application's root directory...
	root = resolve();

	// Load the applicatino's `package.json`, if one exists...
	pkg = path.join( root, 'package.json' );
	if ( fs.existsSync( pkg ) ) {
		pkg = require( path.join( root, 'package.json' ) );
		return pkg.name;
	}
	return '';
} // end FUNCTION appName()


// EXPORTS //

module.exports = appName;
