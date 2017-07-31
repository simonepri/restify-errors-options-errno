import test from 'ava';

import '.'; // eslint-disable-line import/no-unassigned-import, import/order

import restify from 'restify'; // eslint-disable-line import/order
import restifyErrors from 'restify-errors'; // eslint-disable-line import/order
import restifyClients from 'restify-clients'; // eslint-disable-line import/order

let PORT = 6543;

test.cb.beforeEach(t => {
  t.context.port = PORT++;
  t.context.server = restify.createServer();
  t.context.client = restifyClients.createJsonClient({
    url: 'http://127.0.0.1:' + t.context.port
  });

  t.context.server.use(restify.plugins.throttle({
    burst: 1,
    rate: 1,
    ip: true
  }));
  t.context.server.listen(t.context.port, '127.0.0.1', t.end);
});

test.cb.afterEach(t => {
  t.context.client.close();
  t.context.server.close(t.end);
});

test.cb('should set RNFE as errno if the endpoint does not exists', t => {
  t.context.client.get('/foo/bar', err => {
    t.true(err instanceof Error);
    t.is(err.body.code, 'ResourceNotFound');
    t.is(err.body.errno, 'RNFE');
    t.end();
  });
});

test.cb('should set IVE as errno if the requested endpoint\'s version doesn\'t match', t => {
  t.context.server.get({path: '/foo/bar', version: '1.0.0'}, (req, res, next) => {
    res.send();
    next();
  });

  t.context.server.on('VersionNotAllowed', (req, res, err, next) => {
    t.true(err instanceof restifyErrors.InvalidVersionError);
    t.is(err.body.code, 'InvalidVersion');
    t.is(err.body.errno, 'IVE');
    next();
  });

  t.context.client.get({path: '/foo/bar', headers: {'accept-version': '3.0.0'}}, err => {
    t.true(err instanceof Error);
    t.is(err.body.code, 'InvalidVersion');
    t.is(err.body.errno, 'IVE');
    t.end();
  });
});

test.cb('should set TMRE as errno if too many requests are recived', t => {
  t.context.server.get('/foo/bar', (req, res, next) => {
    res.send();
    next();
  });

  const requests = Array.from(Array(100).keys());
  requests.forEach(() => t.context.client.get('/foo/bar', err => {
    if (err) {
      t.is(err.body.code, 'TooManyRequests');
      t.is(err.body.errno, 'TMRE');
      t.end();
    }
  }));
});
