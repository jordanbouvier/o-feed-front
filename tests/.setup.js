const path = require('path');
const babelRegister = require('babel-register');
const babelResolver = require('babel-resolver');
const app = path.join(__dirname, '..', 'app');
const resolveModuleSource = babelResolver(app);
babelRegister({ resolveModuleSource });

/* setup.js */

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
