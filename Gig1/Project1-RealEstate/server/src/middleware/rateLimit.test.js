import test from 'node:test';
import assert from 'node:assert/strict';
import { createRateLimit } from './rateLimit.js';

const request = (ip = '127.0.0.1') => ({ ip, baseUrl: '/api/auth', path: '/login' });
const response = () => ({
  headers: {}, statusCode: 200, body: null,
  set(name, value) { this.headers[name] = value; return this; },
  status(code) { this.statusCode = code; return this; },
  json(body) { this.body = body; return this; }
});

test('rate limiter allows requests up to the configured maximum', () => {
  const limit = createRateLimit({ windowMs: 60_000, max: 2, message: 'slow down' });
  let nextCalls = 0;
  const next = () => { nextCalls += 1; };
  limit(request('limit-test-allow'), response(), next);
  limit(request('limit-test-allow'), response(), next);
  assert.equal(nextCalls, 2);
});

test('rate limiter rejects requests after the configured maximum', () => {
  const limit = createRateLimit({ windowMs: 60_000, max: 1, message: 'slow down' });
  const req = request('limit-test-block');
  const first = response();
  const second = response();
  let nextCalls = 0;
  limit(req, first, () => { nextCalls += 1; });
  limit(req, second, () => { nextCalls += 1; });
  assert.equal(nextCalls, 1);
  assert.equal(second.statusCode, 429);
  assert.equal(second.body.message, 'slow down');
  assert.equal(first.headers['RateLimit-Remaining'], '0');
});
