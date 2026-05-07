function checkAuth() {
    const userData = localStorage.getItem('userLoggedIn');

    // Jika tidak ada data login, tendang balik ke halaman login
    if (!userData) {
        window.location.href = '../login.html';
        return;
    }

    const user = JSON.parse(userData);

    // 1. Ambil Data Nama (Mendukung data dari tabel pengguna/guru)
    const namaLengkap = user.nama || user.nama_lengkap || 'User';
    const namaPanggilan = namaLengkap.split(' ')[0];

    // 2. Update Nama di Navbar (Pojok Kanan Atas)
    // Mencari elemen yang berisi "Memuat..." di sebelah foto profil
    const navName =
        document.getElementById('nav-user-name') ||
        document.querySelector('.header-right span') ||
        document.querySelector('.user-profile span');

    if (navName) {
        navName.innerText = namaLengkap; // Mengganti "Memuat..." jadi nama asli
    }

    // 3. Update Nama di Dashboard (Kotak Selamat Datang)
    const welcomeName =
        document.getElementById('welcome-name') || document.querySelector('.welcome-box h2');

    if (welcomeName) {
        if (user.role === 'siswa') {
            // Siswa menggunakan nama panggilan agar lebih akrab
            welcomeName.innerText = `Selamat Datang, ${namaPanggilan}! 👋`;
        } else {
            // Guru/Admin menggunakan nama lengkap agar formal
            welcomeName.innerText = `Selamat Datang, ${namaLengkap}! 👋`;
        }
    }

    // 4. Update Role & Info Tambahan (Kelas/Jabatan)
    const navRole =
        document.getElementById('nav-user-role') ||
        document.querySelector('.role') ||
        document.querySelector('.user-profile p');

    if (navRole) {
        if (user.role === 'siswa') {
            // Menampilkan kelas yang diambil dari server.js tadi
            navRole.innerText = `Siswa - ${user.id_kelas || 'Tanpa Kelas'}`;
        } else {
            // Mengubah 'guru' menjadi 'Guru' (kapital depan)
            const roleText = user.role.charAt(0).toUpperCase() + user.role.slice(1);
            navRole.innerText = roleText;
        }
    }
}

// Jalankan fungsi otomatis saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', checkAuth);
