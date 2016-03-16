import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import './app.css';

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

chrome.storage.local.get('state', obj => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  const createStore = require('../../app/store/configureStore');
  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
