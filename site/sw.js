/* disable eslint */

import { StateNavigator } from 'navigation';
import { routeDefinitions } from './routes/definitions';

const CACHE_NAME = 'v2';
const urlPrefix = location.href.slice(0, -6);
const HOMEPAGE_URL = urlPrefix + '/';
const OFFLINE_URL = urlPrefix + '/offline';

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
        const link = url.substring(urlPrefix.length);
        if (!/\./.test(link)) {
          try {
            stateNavigator.parseLink(link);
            return caches.match(HOMEPAGE_URL);
          } catch (e) {
            return caches.match(OFFLINE_URL);
          }
        } else {
          return caches.match(event.request);
        }
      })
  );
});
