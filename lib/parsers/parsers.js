'use strict';

// MODULES //

var parseJSON = require( 'utils-json-parse' );


// TODO: see the `cjson` module
// TODO: support *.js configs (e.g., like those used by `mean` stack)

// PARSERS //

var parsers = {
	'.json': parseJSON,
	'.toml': null,
	'.yml': null,
	'.yaml': null,
	'.ini': null
};


// EXPORTS //

module.exports = parsers;
