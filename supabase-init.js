// =========================================================
// FINEX POS - DYNAMIC CONNECTION ENGINE
// File ini mengambil "Kunci" Database dari Session Login
// =========================================================

(function() {
    // 1. Ambil koordinat database dari sessionStorage
    const SB_URL = sessionStorage.getItem('CLIENT_URL');
    const SB_KEY = sessionStorage.getItem('CLIENT_KEY');
    const NAMA_TOKO = sessionStorage.getItem('NAMA_TOKO') || 'Finex Pos';

    // 2. Proteksi Halaman: Jika tidak ada kunci, tendang kembali ke login
    if (!SB_URL || !SB_KEY) {
        // Abaikan proteksi jika user sedang di halaman login
        if (!window.location.pathname.includes('login.html')) {
            window.location.replace('login.html');
        }
    }

    // 3. Inisialisasi Database Client secara Global
    // Sekarang Anda bisa menggunakan variabel 'db' di semua file lain
    window.db = window.supabase.createClient(SB_URL, SB_KEY);

    // 4. Update UI secara otomatis setelah halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {
        // Otomatis ganti nama toko di sidebar/header
        const displayToko = document.querySelector('nav h2') || document.getElementById('store-name-display');
        if (displayToko) displayToko.innerText = NAMA_TOKO;

        // Cek Session User Internal (untuk nama admin/kasir)
        const session = JSON.parse(localStorage.getItem('finex_session'));
        const displayUser = document.getElementById('display-user-nav');
        if (session && displayUser) {
            displayUser.innerText = session.username;
        }
    });
})();
