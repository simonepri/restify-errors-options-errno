'use strict';

const errorsOptions = require('restify-errors-options');

function install() {
  errorsOptions.add('errno', defaultErrno);

  function defaultErrno(code) {
    return (
      code
        .split('')
        .filter(c => c === c.toUpperCase())
        .join('') + 'E'
    );
  }
}

function uninstall() {
  errorsOptions.delete('errno');
}

module.exports = {
  install,
  uninstall,
};
