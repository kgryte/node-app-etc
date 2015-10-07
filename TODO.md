TODO
====

1. bump app-etc-load and app-etc-config deps
2. 
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
