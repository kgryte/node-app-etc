'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isFunction = require( 'validate.io-function' ),
	parsers = require( './parsers.js' );


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
	var ext = extname,
		f;
	if ( !isString( ext ) ) {
		throw new TypeError( 'invalid input argument. Extension argument must be a primitive string. Value: `' + ext + '`.' );
	}
	if ( arguments.length === 1 ) {
		f = parsers[ ext ];
		if ( f === void 0 ) {
			return null;
		}
		return f;
	}
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid input argument. Parser argument must be a function. Value: `' + fcn + '`.' );
	}
	if ( ext[ 0 ] !== '.' ) {
		ext = '.' + ext;
	}
	parsers[ ext ] = fcn;
} // end FUNCTION parser()


// EXPORTS //

module.exports = parser;
