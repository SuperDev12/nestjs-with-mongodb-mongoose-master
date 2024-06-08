self.addEventListener('install', (event: any) => {
    console.log('Service Worker installing.');
    // Perform install steps
  });
  
  self.addEventListener('activate', (event: any) => {
    console.log('Service Worker activating.');
    // Perform activate steps
  });
  
  self.addEventListener('fetch', (event: any) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  });