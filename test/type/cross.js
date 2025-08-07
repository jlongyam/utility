import {env, type, display } from "../../src/index.js";

// Create test values
const types = {
  string: 'hello',
  number: 42,
  boolean: true,
  nullValue: null,
  undefinedValue: undefined,
  symbol: Symbol('test'),
  bigint: 42n,
  object: { a: 1 },
  array: [1, 2, 3],
  date: new Date(),
  regexp: /test/,
  promise: Promise.resolve(),
  map: new Map(),
  set: new Set(),
  error: new Error('test'),
  function: function normalFunc() { },
  asyncFunction: async function asyncFunc() { },
  arrowFunction: () => { },
  class: class TestClass { },
  classInstance: new (class TestClass { })(),
};

if (env.browser) {
  const browserTypes = {
    element: document.createElement('div'),
    textNode: document.createTextNode('text'),
    fragment: document.createDocumentFragment()
  }
  Object.assign(types, browserTypes)
}

// Display all types
for (const [name, value] of Object.entries(types)) {
  display(`${name.padEnd(15)}: ${type(value)}`);
}