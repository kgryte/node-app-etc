etc
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Application configuration.


## Installation

``` bash
$ npm install app-etc
```


## Usage

``` javascript
var etc = require( 'app-etc' );
```

#### etc( [options] )

Returns an application [configuration](https://github.com/kgryte/node-app-etc-config).

``` javascript
var config = etc();
```

The `function` accepts the following `options`:

*	__local__: local application configuration directory. Default: [`./etc`](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard).
*	__defaultsFile__: basename of a file within the *local* application configuration directory which contains *default* application settings. Default: `defaults`.
*	__etc__: application configuration directory. Default: [`/etc`](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard).
*	__etcFile__: basename of a file within an application configuration directory which contains application settings. The default value is the application [name](https://github.com/kgryte/resolve-app-pkginfo).
*	__user__: user configuration directory. The [default value](https://github.com/kgryte/utils-configdir) is determined according to the host OS.
*	__userFile__: basename of a file within the user configuration directory which contains *user* application settings. The default value is the application [name](https://github.com/kgryte/resolve-app-pkginfo).
*	__env__: application runtime environment. Default: `dev`.
*	__envFile__: basename of a file within the *local* application configuration directory which maps environment variables to application settings. Default: `env`.
*	__order__: defines the configuration hierarchy. Default: `['defaults','app','local','user','env']`.


__Notes__:

*	If a file extension is omitted when specifying file basenames, this module will search for the first file having the basename and a supported extension. For supported extensions, see [app-etc-load](https://github.com/kgryte/node-app-etc-load).
*	If a file basename does __not__ begin with a `.`, this module will search for both hidden and non-hidden files. This also applies for inferred basenames; e.g., __env__. If `env` is `dev`, this module will search for and load either an `.dev.<ext>` or a `dev.<ext>` file. 



##### Local Configuration Directory

By default, the __local__ application configuration directory is a directory named [`etc`](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard) located in the application's [root](https://github.com/kgryte/resolve-app-path) directory. This directory may contain default configuration settings, mappings between environment variables and configuration settings, various application-specific configuration files tailored for different runtime environments, and more. To specify a different directory, set the `local` option:

``` javascript
var config = etc({
	'local': './config'
});
```


##### Default Configuration

A __defaults__ file should contain default application configuration settings; e.g., if applicable, a default log level, port, etc. By default, this module looks for a file with the basename `defaults`. To specify a different basename, set the `defaultsFile` option:

``` javascript
var config = etc({
	'defaultsFile': 'shared_settings'
});
```


##### Application Configuration

The __etc__ directory option specifies the location of a directory containing application-specific configuration files. The default value is [`/etc`](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard), but this may __not__ apply for all operating systems (e.g., [Windows](http://stackoverflow.com/questions/2359338/windows-equivalent-of-system-configuration-directory)). To specify a different directory, set the `etc` option:

``` javascript
var config = etc({
	'etc': '/config'
});
```

An __etc__ file should contain application-specific configuration settings. By default, this module searches for a file having a basename equal to the application name. To specify a different basename, set the `etcFile` option:

``` javascript
var config = etc({
	'etcFile': 'appname/config.alce' 
});
```


##### User Configuration

The __user__ directory option specifies the location of a directory containing [user-specific](https://github.com/kgryte/utils-configdir) configuration files. The location of this directory is typically OS specific. To specify a directory, set the `user` option:

``` javascript
var config = etc({
	'user': '~/'
});
```

A __user__ file should contain user-specific configuration settings. By default, this module searches for a file having a basename equal to the application name. To specify a different basename, set the `userFile` option:

``` javascript
var config = etc({
	'userFile': '.appname.json' 
});
```


##### Runtime Configuration

Often different runtime environments require different application configurations. For example, in `development`, the application may connect to local resources; whereas, in `production`, the application may connect to various remote endpoints. To handle the different runtimes, applications will utilize environment specific configuration files; e.g., `production.json`, `development.json`, `test.json`, `local.json`, etc. This module sets the default runtime environment to `dev` and looks for a corresponding configuration file of the same name in the __local__ application configuration directory. To override this option, either set the `NODE_ENV` [environment variable](https://en.wikipedia.org/wiki/Environment_variable) or set the `env` option:

``` javascript
var config = etc({
	'env': 'local'
});
```

Runtime environments (e.g., [containers](https://docs.docker.com/reference/run/#env-environment-variables)) frequently use [environment variables](https://en.wikipedia.org/wiki/Environment_variable) for configuration. To map [environment variables](https://en.wikipedia.org/wiki/Environment_variable) to configuration settings, this module searches the __local__ application configuration directory for a file which maps each [environment variable](https://en.wikipedia.org/wiki/Environment_variable) to a particular setting. By default, this module looks for a file having the basename `env`. To specify a different basename, set the `envFile` option:

``` javascript
var config = etc({
	'envFile': 'env_mapping'
});
```

The file contents should include each relevant [environment variable](https://en.wikipedia.org/wiki/Environment_variable) and a corresponding setting. For example, a JSON mapping file:

``` javascript
{
	"GITHUB_API_KEY": {
		"keypath": "gKey"
	},
	"DEBUG_LEVEL": {
		"keypath": "logger.level"
	},
	"PORT": {
		"keypath": "server.port",
		"type": "number"
	},
	"SSL_KEY": {
		"keypath": "server.key",
		"type": "string"
	},
	"SSL_CERT": {
		"keypath": "server.cert",
		"type": "string"
}
```

A TOML mapping file:

``` toml
# A TOML file which maps environment variables to configuration settings...

[GITHUB_API_KEY]
keypath = "gKey"

# Logger environment variables:
[DEBUG_LEVEL]
keypath = "logger.level"

# Server environment variables:
[PORT]
keypath = "server.port"
type = "number"

[SSL_KEY]
keypath = "server.key"
type = "string"

[SSL_CERT]
keypath = "server.cert"
type = "string"
```

See [env-to-object](https://github.com/kgryte/node-env-to-object) for more information. Note that, if an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) cannot be cast as a specified type, the module __will__ throw an `error`.



##### Configuration Hierarchy

Configuration sources are many; e.g., user-specific, application-specific, runtime-specific, [environment variables](https://en.wikipedia.org/wiki/Environment_variable), and more. The following sources are supported:

*	__defaults__: default application settings
*	__app__ : application-specific settings
*	__local__: local application-specific settings
*	__user__: user-specific settings
*	__env__: [environment variable](https://en.wikipedia.org/wiki/Environment_variable) runtime settings

The `order` option exists to impose a configuration hierarchy. By default, the hierarchy is biased toward Linux systems:

``` javascript
[
	'defaults', // read first
	'app',
	'local',
	'user',
	'env'       // read last
]
```

To specify a different order, set the `order` option:

``` javascript
// Only use local application configuration and environment variables as configuration sources...
var config = etc({
	'order': [
		'local',
		'env'
	]
});
```



#### etc.parser( extname[, parser] )

Returns a parser for the specified extension.

``` javascript
var parser = etc.parser( '.json' );
```

Including the `.` when specifying an extension is optional.

``` javascript
var parser = etc.parser( 'json' );
```

To support additional file formats or to override a parser, provide a `parser` function for an associated extension.

``` javascript
var parser = require( 'my-special-fmt-parser' );

etc.parser( '<my-ext>', parser );
```

Once a parser is set, __all__ configuration instances will parse provided files accordingly.

``` javascript
config.load( './file.<my-ext>' );
```

For more details, see [app-etc-load](https://github.com/kgryte/node-app-etc-load).



## Examples

``` javascript
var path = require( 'path' ),
	etc = require( 'app-etc' );

var config = etc({
	'local': path.join( __dirname, 'etc' )
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
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* NODE_ENV=dev PORT=8080 node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/app-etc.svg
[npm-url]: https://npmjs.org/package/app-etc

[travis-image]: http://img.shields.io/travis/kgryte/node-app-etc/master.svg
[travis-url]: https://travis-ci.org/kgryte/node-app-etc

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/node-app-etc/master.svg
[codecov-url]: https://codecov.io/github/kgryte/node-app-etc?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/node-app-etc.svg
[dependencies-url]: https://david-dm.org/kgryte/node-app-etc

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/node-app-etc.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/node-app-etc

[github-issues-image]: http://img.shields.io/github/issues/kgryte/node-app-etc.svg
[github-issues-url]: https://github.com/kgryte/node-app-etc/issues
