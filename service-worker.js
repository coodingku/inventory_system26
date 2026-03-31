// sw.js
self.addEventListener('push', function(event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) return;

    let data = {
        title: 'Beauty Bloom 🌸',
        body: 'Ada kejutan baru untuk kamu!',
        icon: 'https://uojhjskgugghwxtdsfvm.supabase.co/storage/v1/object/public/assets/logo-bloom.png'
    };

    if (event.data) {
        data = event.data.json();
    }

    const options = {
        body: data.body,
        icon: data.icon,
        badge: 'https://uojhjskgugghwxtdsfvm.supabase.co/storage/v1/object/public/assets/badge.png',
        vibrate: [200, 100, 200],
        data: { url: data.url || '/index.html' }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
