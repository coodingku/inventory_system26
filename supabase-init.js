// supabase-init.js

// 1. Ambil data dari session (diisi saat login nanti)
const ACTIVE_URL = sessionStorage.getItem('CLIENT_URL');
const ACTIVE_KEY = sessionStorage.getItem('CLIENT_KEY');

// 2. Jika tidak ada koordinat (belum login), tendang ke halaman login
// Kecuali jika user memang sedang berada di halaman login.html
if (!ACTIVE_URL || !ACTIVE_KEY) {
    if (!window.location.pathname.includes('login.html')) {
        window.location.href = 'login_backup.html'; // Sesuaikan nama file login Anda
    }
}

// 3. Inisialisasi Supabase menggunakan koordinat dinamis
// Variabel 'db' ini yang akan dipakai di seluruh file (produk.html, dll)
const db = supabase.createClient(ACTIVE_URL, ACTIVE_KEY);

// Bonus: Menampilkan Nama Toko di Header secara otomatis
document.addEventListener('DOMContentLoaded', () => {
    const elNamaToko = document.getElementById('display-nama-toko');
    if (elNamaToko) elNamaToko.innerText = sessionStorage.getItem('NAMA_TOKO') || 'Finex Pos';
});
