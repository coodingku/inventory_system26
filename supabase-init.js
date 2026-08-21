// =========================================================
// FINEX POS - DYNAMIC CONNECTION ENGINE & PUBLIC BYPASS
// =========================================================

(function() {
    // 1. DAFTAR KUNCI DEFAULT / FALLBACK (Ganti dengan URL & ANON KEY Supabase Utama Anda)
    const DEFAULT_SB_URL = "https://your-supabase-project.supabase.co"; // <-- Masukkan Supabase URL Anda
    const DEFAULT_SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";     // <-- Masukkan Supabase Anon Key Anda

    // 2. Cek apakah halaman yang dibuka adalah halaman publik (invoice-view)
    const isPublicPage = window.location.pathname.includes('invoice-view.html') || 
                         window.location.pathname.includes('login.html');

    // 3. Ambil koordinat database dari sessionStorage, atau gunakan default jika di halaman publik
    let SB_URL = sessionStorage.getItem('CLIENT_URL');
    let SB_KEY = sessionStorage.getItem('CLIENT_KEY');
    const NAMA_TOKO = sessionStorage.getItem('NAMA_TOKO') || 'BeautyBloom';

    // Jika ini halaman publik dan sessionStorage kosong, gunakan kunci default
    if (isPublicPage && (!SB_URL || !SB_KEY)) {
        SB_URL = DEFAULT_SB_URL;
        SB_KEY = DEFAULT_SB_KEY;
    }

    // 4. Proteksi Halaman Internal: Jika bukan halaman publik dan tidak ada kunci, lempar ke login
    if (!isPublicPage && (!SB_URL || !SB_KEY)) {
        window.location.replace('login.html');
        return; // Hentikan eksekusi script
    }

    // 5. Inisialisasi Database Client secara Global
    if (window.supabase && SB_URL && SB_KEY) {
        window.db = window.supabase.createClient(SB_URL, SB_KEY);
    }

    // 6. Update UI secara otomatis setelah halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {
        // Otomatis ganti nama toko di sidebar/header
        const displayToko = document.querySelector('nav h2') || document.getElementById('store-name-display');
        if (displayToko) displayToko.innerText = NAMA_TOKO;

        // Cek Session User Internal (hanya untuk halaman admin/kasir)
        if (!isPublicPage) {
            const session = JSON.parse(localStorage.getItem('finex_session'));
            const displayUser = document.getElementById('display-user-nav');
            if (session && displayUser) {
                displayUser.innerText = session.username;
            }
        }
    });
})();
