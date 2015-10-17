TODO
====

1. bump app-etc-load and app-etc-config deps
	-	for `config`, see (4) below.
	-	load, config, etc should specify 1.x.x versions
2. 
3. 
4. ability to specify a schema????
	-	would allow validation; when merging, etc., could capture a "snapshot" and rollback if invalid
		-	or if using `set`, just validate the value/sub-configuration being set
			-	this is not really possible out-of-the-box
	-	on merge/set, could provide option to prevent validation
		-	e.g., `validate: false`
	- 	naive validation would require copying the entire config, validating everything, and then only reassigning the underlying store if valid
		-	this is a relatively expensive operation
		-	would be better if could just validate what changed
	-	how about just a method which the user can choose to use to validate at any point? e.g., `etc.validate( config )`?
		-	might be better to hang the method off `config`
5. what about a `configFile` option for an arbitrary configuration file?
	-	[rc](https://github.com/dominictarr/rc) supports a `--config` option
	-	in terms of `order`, this would be last
	-	but then again, what is returned is a `Config` instance which can load and parse files
		-	leaning toward not supporting
		-	this should be punted to userland and just be an application specific `argv`
6. 
7. how to handle `.<appname>` config files where extension is unknown?
	-	cannot reliably sniff the type either
	-	could just assume the file is `ini` ("everything is ini")
		-	in `./lib/load`, could check for a `.<basename>` and `.<basename>rc` file when a basename does not have an extension
		-	this could be a step before entering the `for` loop
		- 	if found, parse as `ini`
8. consider supporting `argv` mapping
	-	would require similar approach to environment variables
	-	what about when an `argv` refers to a file? e.g., `--config` ?
	-	this feels like it should be a userland type thing
		-	maybe not; as an `argv` mapping can selectively choose which args to map. If a `--config` option, this *can* still be handled in userland
		-	sep mod similar to env vars
			-	app-etc-argv? argv2obj? map-argv?
			-	no for `app-` prefix
	-	`argv` would also be last in the order, after env vars
9. 


#### Prior Art

*	[decisions](https://github.com/jaredhanson/node-decisions)
*	[bixby-common](https://github.com/bixbyjs/bixby-common)
*	[config](https://github.com/lorenwest/node-config)
*	[etc](https://github.com/cpsubrian/node-etc)
*	[rc](https://github.com/dominictarr/rc)
*	[config-chain](https://github.com/dominictarr/config-chain)
*	[convict](https://github.com/mozilla/node-convict)
