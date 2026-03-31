// push-manager.js
async function registerPushNotification(customerId) {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    try {
        const registration = await navigator.serviceWorker.register('sw.js');
        
        // Minta Izin
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        // Cek Langganan yang ada
        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
            // Ganti 'YOUR_VAPID_PUBLIC_KEY' dengan key dari Provider Notif (Firebase/OneSignal/WebPush)
            const publicVapidKey = 'BFA_Isi_Dengan_Key_Anda_Disini'; 
            
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });
        }

        // Simpan ke Supabase
        const subJson = subscription.toJSON();
        await db.from('push_subscriptions').upsert([{
            customer_id: customerId,
            endpoint: subJson.endpoint,
            p256dh: subJson.keys.p256dh,
            auth: subJson.keys.auth
        }], { onConflict: 'customer_id, endpoint' });

        console.log("HP Terdaftar untuk Notifikasi ✨");
    } catch (err) {
        console.error("Gagal daftar push:", err);
    }
}

// Helper untuk konversi key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
