// =========================================================
// FINEX BEAUTY BLOOM - ONLINE SHOP ENGINE
// File ini menggunakan kunci tetap untuk akses Customer
// =========================================================

(function() {
    // 1. Masukkan URL dan KEY Supabase Anda secara langsung di sini
    // Ambil dari Dashboard Supabase -> Settings -> API
    const SB_URL = "https://xyz-your-url.supabase.co"; 
    const SB_KEY = "eyJhbG...your-anon-key"; 

    // 2. Inisialisasi Database Client
    // Tanpa proteksi redirect, agar customer bisa langsung akses
    if (SB_URL && SB_KEY) {
        window.db = window.supabase.createClient(SB_URL, SB_KEY);
        console.log("Koneksi Online Shop Berhasil! 🌸");
    } else {
        console.error("Kunci database online belum diisi!");
    }

    // 3. Update Nama Toko jika perlu
    document.addEventListener('DOMContentLoaded', () => {
        const displayToko = document.getElementById('store-name-display');
        if (displayToko) displayToko.innerText = "Beauty Bloom 🌸";
    });
})();
