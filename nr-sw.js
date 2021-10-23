"use strict";

const version = 'v2:';
const appName = "5gspeed";
const appAssets = [
	'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.1/js.cookie.min.js',

	'/5g-speed/',
	'/5g-speed/images/5g-512.jpg',
	'/5g-speed/images/5g-256.jpg',
	'/5g-speed/images/5g-128.jpg',
	'/5g-speed/manifest.json',
	'/5g-speed/app.js',
	'/5g-speed/strings.js',
	'/5g-speed/style.css'
];

self.addEventListener("install", function (event) {
	self.skipWaiting();
	event.waitUntil(caches.open(version + appName).then(function (cache) {
		return cache.addAll(appAssets);
	}).then(function () {
		console.log('sw: install completed');
	}));
});

self.addEventListener("fetch", function (event) {
	console.log('sw: fetch event in progress.');
	if (event.request.method !== 'GET') {
		console.log('sw: fetch event ignored.', event.request.method, event.request.url);
		return;
	}
	event.respondWith(
		caches.match(event.request).then(function (cached) {
			var networked = fetch(event.request).then(fetchedFromNetwork, unableToResolve).catch(unableToResolve);

			function fetchedFromNetwork(response) {
				var cacheCopy = response.clone();
				console.log('sw: fetch response from network.', event.request.url);

				caches.open(version + appName).then(function add(cache) {
					cache.put(event.request, cacheCopy);
				}).then(function () {
					console.log('sw: fetch response stored in cache.', event.request.url);
				});

				return response;
			}

			function unableToResolve() {
				console.log('sw: fetch request failed in both cache and network.');

				return new Response('<h1 style="font-weight:100;font-family:sans-serif;">Cannot load 5G Speed Calculator</h1>', {
					status: 503,
					statusText: 'Service Unavailable',
					headers: new Headers({
						'Content-Type': 'text/html'
					})
				});
			}

			console.log('sw: fetch event', cached ? '(cached)' : '(network)', event.request.url);
			return cached || networked;
		})
	);
});

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(
				keys.filter(function (key) {
					return !key.startsWith(version);
				}).map(function (key) {
					return caches.delete(key);
				})
			);
		}).then(function () {
			console.log('sw: activate completed.');
		})
	);
});
