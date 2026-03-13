// =========================================================
// FINEX BEAUTY BLOOM - ONLINE SHOP ENGINE
// File ini menggunakan kunci tetap untuk akses Customer
// =========================================================

(function() {
    // 1. Masukkan URL dan KEY Supabase Anda secara langsung di sini
    // Ambil dari Dashboard Supabase -> Settings -> API
    const SB_URL = "https://uojhjskgugghwxtdsfvm.supabase.co"; 
    const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvamhqc2tndWdnaHd4dGRzZnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MTQ3OTQsImV4cCI6MjA4NDE5MDc5NH0.DZ5KfYYxy8yU2k1kgb8itJ7knefgX1k5NrUOdpgN0QM"; 

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
