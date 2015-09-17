'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' );


// SET //

/**
* FUNCTION: set( keypath, value[, options] )
*	Sets a configuration value according to a provided `keypath`.
*
* @param {String} keypath - key path
* @param {*} value - value to set
* @param {Object} [options] - function options
* @returns {Boolean} boolean indicating whether a configuration value was set
*/
function set( keypath, value, options ) {
	/* jshint validthis:true */
	var opts;
	if ( arguments.length > 2 ) {
		opts = options;
	} else {
		opts = {
			'sep': this._opts.sep,
			'create': this._opts.create
		};
	}
	return deepSet( this._db, keypath, value, opts );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;
