'use strict';

var path = require( 'path' ),
	etc = require( './../lib' );

var config = etc({
	'etc': path.join( __dirname, 'etc' )
});
console.dir( config.get() );
/*
	{
		'server': {
			'port': 8080,
			'address': '127.0.0.1',
			'ssl': false,
			'key': '',
			'cert': ''
		},
		'logger': {
			'level': 'debug'
		},
		'env': 'dev'
	}
*/
