import 'whatwg-fetch';
import { makeApp } from '../../site/client';

// Hot reloading when state changes
import _ from '../../assets/state.json'; // eslint-disable-line no-unused-vars, import/extensions

const element = document.querySelector('.js-app');

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

fetch('/state.json').then(handleErrors).then(r => r.json()).then(data => {
  const app = makeApp({ element, data });
  app.start();
});
