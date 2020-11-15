importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/site.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/assets/header.jpg', revision: '1' },
    { url: '/assets/icon.png', revision: '1' },
    { url: '/assets/indra.jpeg', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
], {
    // Ignore all URL parameters.
    ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    new workbox.strategies.StaleWhileRevalidate()
);

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: '/assets/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Champion League Standings', options)
    );
});