const CACHE_NAME = 'mali-connect-v3'

self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Take control of all clients immediately
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  // Only handle navigation requests, let Vite handle assets
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html')
      })
    )
  }
  // For all other requests, let them pass through normally
})
