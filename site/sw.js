/* disable eslint */

import { StateNavigator } from 'navigation';
import { routeDefinitions } from './routes/definitions';

const CACHE_NAME = 'v2';
const HOMEPAGE_URL = '/';
const OFFLINE_URL = '/offline';

const stateNavigator = new StateNavigator(routeDefinitions);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([HOMEPAGE_URL, OFFLINE_URL]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
        return null;
      }));
    })
  );
});

self.addEventListener('fetch', event => {
  const { url } = event.request;
  event.respondWith(
    fetch(event.request)
      .then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') {
          return res;
        }
        if (/\.(css|js|png|jpg|woff2)$/i.test(url)) {
          const responseToCache = res.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return res;
      }).catch(() => {
        const prefixLength = location.href.slice(0, -6).length;
        const link = url.substring(prefixLength);
        if (!/\./.test(link)) {
          const navigationLink = stateNavigator.parseLink(link);
          return caches.match(navigationLink ? HOMEPAGE_URL : OFFLINE_URL);
        }
      })
  );
});
