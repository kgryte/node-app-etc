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

#### etc()

Application configuration.

``` javascript
etc()
// returns 
```


## Examples

``` javascript
var etc = require( 'app-etc' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
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
