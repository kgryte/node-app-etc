'use strict';

// MODULES //

var parser1 = require( 'app-etc-config' ).parser,
	parser2 = require( 'app-etc-load' ).parser,
	parser3 = require( 'find-user-app-config' ).parser;


// PARSER //

/**
* FUNCTION: parser( extname[, fcn] )
*	If provided a parser, sets the parser assigned to a specified filename extension. Otherwise, returns a parser for the provided extension.
*
* @param {String} extname - filename extension
* @param {Function} [fcn] - parser
* @returns {Function|Null|Void} parser, null, or undefined
*/
function parser( extname, fcn ) {
	if ( arguments.length < 2 ) {
		return parser1( extname );
	}
	parser1( extname, fcn );
	parser2( extname, fcn );
	parser3( extname, fcn );
} // end FUNCTION parser()


// EXPORTS //

module.exports = parser;
