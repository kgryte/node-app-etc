'use strict';

var path = require( 'path' ),
	etc = require( './../lib' );

var config = etc({
	'local': path.join( __dirname, 'etc' ),
	'schemaFile': 'schema.json'
});
console.dir( config.get() );
/*
	{
		'server': {
			'port': 8080,
			'address': '127.0.0.1',
			'ssl': true,
			'key': '',
			'cert': ''
		},
		'logger': {
			'level': 'debug'
		},
		'env': 'dev'
	}
*/
