/* disable eslint */

import { StateNavigator } from 'navigation';
import { routeDefinitions } from './routes/definitions';

const CACHE_NAME = 'v2';
const urlPrefix = location.href.slice(0, -6);
const HOMEPAGE_URL = urlPrefix + '/';
const OFFLINE_URL = urlPrefix + '/offline/';

const stateNavigator = new StateNavigator(routeDefinitions);

// Caches the Home and Offline pages on installation of service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([HOMEPAGE_URL, OFFLINE_URL]);
    })
  );
});

// Deletes old caches on activation of new service worker
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
        // Caches assets on demand
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
        // Checks if the URL doesn't contains '.'.
        // If it doesn't it's a page request, e.g., https://domain/about-us
        // If it does it's an asset request, e.g., https://domain/logo.png
        if (!/\./.test(link)) {
          try {
            // Checks if the URL is part of website-honestly navigation
            // If it is, e.g., https://domain/about-us, then it returns the
            // Home page and lets website-honestly navigate to the component
            // If it isn't, e.g., https://domain/blog, then it returns the
            // Offline page
            stateNavigator.parseLink(link);
            return caches.match(HOMEPAGE_URL);
          } catch (e) {
            return caches.match(OFFLINE_URL);
          }
        } else {
          // Returns the asset from the cache
          return caches.match(event.request);
        }
      })
  );
});
