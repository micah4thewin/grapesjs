import 'regenerator-runtime/runtime';
// jsdom ships neither structuredClone nor IndexedDB, both of which the
// persistence store needs. v8's serializer is a faithful stand-in.
import { deserialize, serialize } from 'v8';

if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (sourceValue) => deserialize(serialize(sourceValue));
}
// Required rather than imported so it loads after the polyfill above.
require('fake-indexeddb/auto');
import 'whatwg-fetch';
import _ from 'underscore';

const localStorage = {
  getItem(key) {
    return this[key];
  },
  setItem(key, value) {
    this[key] = value;
  },
  removeItem(key, value) {
    delete this[key];
  },
};

global._ = _;
global.__GJS_VERSION__ = '';
global.grapesjs = require('./../src').default;
global.$ = global.grapesjs.$;
Object.defineProperty(global, 'localStorage', {
  value: localStorage,
  configurable: true,
});
