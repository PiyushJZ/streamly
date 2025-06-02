'use strict';

const reqQueue = require('..');
const assert = require('assert').strict;

assert.strictEqual(reqQueue(), 'Hello from reqQueue');
console.info('reqQueue tests passed');
