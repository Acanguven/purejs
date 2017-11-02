var CACHE_NAME = 'purejs_cache_offline';
var OFFLINE_PAGE_PATH = 'offline.html';

self.addEventListener('install', function(event) {
  var offlinePage = new Request(OFFLINE_PAGE_PATH);
  event.waitUntil(
    fetch(offlinePage).then(function(response) {
      return caches.open(CACHE_NAME).then(function(cache) {
        return cache.put(offlinePage, response);
      });
    }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
      return caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(OFFLINE_PAGE_PATH);
      });
    }));
});

self.addEventListener('refreshOffline', function(response) {
  return caches.open(CACHE_NAME).then(function(cache) {
    return cache.put(offlinePage, response);
  });
});