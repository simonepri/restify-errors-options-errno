# restify-errors-options-errno
[![Travis CI](https://travis-ci.org/simonepri/restify-errors-options-errno.svg?branch=master)](https://travis-ci.org/simonepri/restify-errors-options-errno) [![Codecov](https://img.shields.io/codecov/c/github/simonepri/restify-errors-options-errno/master.svg)](https://codecov.io/gh/simonepri/restify-errors-options-errno) [![npm](https://img.shields.io/npm/dm/restify-errors-options-errno.svg)](https://www.npmjs.com/package/restify-errors-options-errno) [![npm version](https://img.shields.io/npm/v/restify-errors-options-errno.svg)](https://www.npmjs.com/package/restify-errors-options-errno) [![npm dependencies](https://david-dm.org/simonepri/restify-errors-options-errno.svg)](https://david-dm.org/simonepri/restify-errors-options-errno) [![npm dev dependencies](https://david-dm.org/simonepri/restify-errors-options-errno/dev-status.svg)](https://david-dm.org/simonepri/restify-errors-options-errno#info=devDependencies)
> 🐛 Add errno to Restify's errors!


## Install

```
$ npm install --save restify-errors-options-errno
```

## Usage
```js
const restifyErrorOtionsErrno = require('restify-errors-options-errno');
// Is extremely important to require restify-errors-options-errno before restify.
const restify = require('restify');

restifyErrorOtionsErrno.install();
var server = restify.createServer();

server.on('MethodNotAllowed', (req, res, err, cb) => {
  console.log(err.body.errno);
  //=> 'MNAE'
  cb();
});

const err = new restify.errors.MethodNotAllowedError({errno: '42'}});
console.log(err.toJSON());
//=> {code: 'MethodNotAllowed', message: '', errno: '42'}
```

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/restify-errors-options-errno/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
