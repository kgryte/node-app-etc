'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ),
	parseJSON = require( 'utils-json-parse' ),
	isnan = require( 'validate.io-nan' ),
	load = require( './load.js' );


// ENVIRONMENT VARIABLES //

/**
* FUNCTION: env( dir, basename )
*	Creates a configuration object from environment variables.
*
* @param {String} dir - configuration directory
* @param {String} basename - basename of file containing environment variable mappings
* @returns {Object|Null} configuration object or null
*/
function env( dir, basename ) {
	var keys,
		obj,
		out,
		len,
		val,
		o,
		i;

	obj = load( dir, basename );
	if ( obj === null ) {
		return null;
	}
	keys = Object.keys( obj );
	len = keys.length;
	out = {};
	for ( i = 0; i < len; i++ ) {
		o = obj[ keys[ i ] ];
		val = process.env[ keys[ i ] ];
		if ( val === void 0 ) {
			continue;
		}
		if ( o.type === 'number' ) {
			val = parseFloat( val );
			if ( isnan( val ) ) {
				throw new TypeError( 'invalid value. ' + keys[ i ] + ' environment variable must be a number. Value: `' + val + '`.' );
			}
		}
		else if ( o.type === 'boolean' ) {
			if (
				val === 'true' ||
				val === 'TRUE' ||
				val === 'True' ||
				val === 'T' ||
				val === 't'
			) {
				val = true;
			}
			else if (
				val === 'false' ||
				val === 'FALSE' ||
				val === 'False' ||
				val === 'F' ||
				val === 'f'
			) {
				val = false;
			}
			else {
				throw new TypeError( 'invalid value. ' + keys[ i ] + ' environment variable must be a boolean. Value: `' + val + '`.' );
			}
		}
		else if ( o.type === 'object' ) {
			val = parseJSON( val );
			if ( val instanceof Error ) {
				throw new TypeError( 'invalid value. ' + keys[ i ] + ' environment variable must be a valid JSON object. Value: `' + val + '`.' );
			}
		}
		deepSet( out, o.keypath, val, {
			'create': true,
			'sep': '.'
		});
	}
	return out;
} // end FUNCTION env()


// EXPORTS //

module.exports = env;
