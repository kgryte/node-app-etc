'use strict';

// MODULES //

var parsers = require( './parsers.js' );


// EXTENSIONS //

/**
* FUNCTION: exts()
*	Returns a list of supported filename extensions.
*
* @returns {String[]} list of supported filename extensions
*/
function exts() {
	return Object.keys( parsers );
} // end FUNCTION exts()


// EXPORTS //

module.exports = exts;
