CACHE_VERSION = 2;
CACHE_NAME = CACHE_VERSION + '_purejs_cache_offline';
OFFLINE_PAGE_PATH = 'offline.html';
CACHE_REGEX_LIST = [
  /\.css/,
  /\.js/,
  /\.png/,
  /css/
];


self.addEventListener('install', function (event) {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  var offlinePage = new Request(OFFLINE_PAGE_PATH);
  event.waitUntil(
    fetch(offlinePage).then(function (response) {
      return caches.open(CACHE_NAME).then(function (cache) {
        return cache.put(offlinePage, response);
      });
    }));
});


self.addEventListener('fetch', function (event) {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(function(cachedResponse) {
        if (cachedResponse) {
          console.log(cachedResponse);
          return cachedResponse;
        }
        return caches.open(CACHE_NAME).then(function(cache) {
          return fetch(event.request).then(function(response) {
            if(CACHE_REGEX_LIST.some(function (rx) {
              return rx.test(event.request.url);
            })){
              return cache.put(event.request, response.clone()).then(function() {
                return response;
              });
            }else{
              return response;
            }
          }).catch(function(error) {
            return cache.match(OFFLINE_PAGE_PATH);
          });
        });
      })
    );
  }
});

self.addEventListener('refreshOffline', function (response) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.put(offlinePage, response);
  });
});