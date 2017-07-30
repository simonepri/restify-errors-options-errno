'use strict';

const errorsOptions = require('restify-errors-options');

errorsOptions.add('errno', defaultErrno);

function defaultErrno(code) {
  return code.split('').filter(c => c === c.toUpperCase()).join('');
}
module.exports = null;
