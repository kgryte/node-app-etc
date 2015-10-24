TODO
====

1. bump app-etc-config dep (1.x.x)
2. ability to specify a schema????
	-	could allow a schema to be provided and then do a one-off validation once all configuration sources have loaded

		``` javascript
		var c = config.get();
		var v = validator( schema );
		v( c );
		if ( v.errors ) {...} 
		```

3. how to handle `.<appname>` config files where extension is unknown?
	-	cannot reliably sniff the type either
	-	could just assume the file is `ini` ("everything is ini")
		-	in `./lib/load`, could check for a `.<basename>` and `.<basename>rc` file when a basename does not have an extension
			-	will need to refactor a bit to support calling `load` module with explicit `fmt`, which is supported, just not used
		-	this could be a step before entering the `for` loop
		- 	if found, parse as `ini`
	-	could provide option, e.g., `rcFormat`, etc., which indicates how to parse an `rc` file. Default: `ini`.
	-	to mimic `rc` mod
		-	search for `.<appname>` OR `.<appname>rc`
		-	accept an `rcFormat` (?) option (default: `ini`)
		-	if found, read and parse file using format option
		-	if not found, look in `$HOME`
4. 


#### Prior Art

*	[decisions](https://github.com/jaredhanson/node-decisions)
*	[bixby-common](https://github.com/bixbyjs/bixby-common)
*	[config](https://github.com/lorenwest/node-config)
*	[etc](https://github.com/cpsubrian/node-etc)
*	[rc](https://github.com/dominictarr/rc)
*	[config-chain](https://github.com/dominictarr/config-chain)
*	[convict](https://github.com/mozilla/node-convict)
*	[seraphim](https://github.com/gagle/node-seraphim)
