const bluebird = require('bluebird');
global.Promise = bluebird;

function promisifier(method) {
  return function promisified(...args) {
    return new Promise((resolve, reject) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction'
]);
promisifyAll(chrome.storage, [
  'local',
]);
