TODO
====

1. ability to specify a schema????
	-	could allow a schema to be provided and then do a one-off validation once all configuration sources have loaded

		``` javascript
		var c = config.get();
		var v = validator( schema );
		v( c );
		if ( v.errors ) {...} 
		```

	-	look for `schema` file in `local` dir
		-	add `schema` default file name to `defaults.json`
	-	add validation example to README

2. 




#### Prior Art

*	[decisions](https://github.com/jaredhanson/node-decisions)
*	[bixby-common](https://github.com/bixbyjs/bixby-common)
*	[config](https://github.com/lorenwest/node-config)
*	[etc](https://github.com/cpsubrian/node-etc)
*	[rc](https://github.com/dominictarr/rc)
*	[packagerc](https://github.com/deanlandolt/packagerc)
*	[config-chain](https://github.com/dominictarr/config-chain)
*	[convict](https://github.com/mozilla/node-convict)
*	[seraphim](https://github.com/gagle/node-seraphim)
