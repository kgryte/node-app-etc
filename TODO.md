TODO
====

1. bump app-etc-load and app-etc-config deps
	-	for `config`, see (4) below.
2. finish implementation/tests for `user`
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
5. load, config, etc should specify 1.x.x versions
6. 
7. how to handle `.<appname>` config files where extension is unknown?
	-	cannot reliably sniff the type either
8. consider supporting `argv` mapping
	-	would require similar approach to environment variables
9. [rc](https://github.com/dominictarr/rc) has a notion of retaining which config sources were used to derive a config; useful?
	-	maybe for inspection: repl or debug
	-	could log to `DEBUG`
10. 
11. when searching, search for both `dev.toml` and `.dev.toml` variants
12. 


#### Prior Art

*	[decisions](https://github.com/jaredhanson/node-decisions)
*	[bixby-common](https://github.com/bixbyjs/bixby-common)
*	[config](https://github.com/lorenwest/node-config)
*	[etc](https://github.com/cpsubrian/node-etc)
*	[rc](https://github.com/dominictarr/rc)
*	[config-chain](https://github.com/dominictarr/config-chain)
*	[convict](https://github.com/mozilla/node-convict)
