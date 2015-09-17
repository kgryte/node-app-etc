TODO
====

1. factory method for creating new `Config` instances
2. move app-name to sep module
	-	make sync and async versions
3. os specific config dirs
	-	make sep module
4. ability to specify a schema????
	-	would allow validation; when merging, etc., could capture a "snapshot" and rollback if invalid
		-	or if using `set`, just validate the value/sub-configuration being set
			-	this is not really possible out-of-the-box
	-	on merge/set, could provide option to prevent validation
		-	e.g., `validate: false`
	- 	naive validation would require copying the entire config, validating everything, and then only reassigning the underlying store if valid
		-	this is a relatively expensive operation
		-	would be better if could just validate what changed
5. 


#### config

1. move `config` to separate module `app-etc-config`
2. 


#### loader

1. default.json should probably go away, as it is highly application specific
	-	but can look for a `defaults` file
2. ability to specify the default environment at initialization; e.g., `dev` or `develop`, etc.
3. separate module `app-etc-load`
4. 


#### parsers

1. sep module `app-etc-parsers`
2. wrap `toml` similar to `utils-json-parse`
3. ditto for `yaml`
4. ditto for `ini`
5. 
