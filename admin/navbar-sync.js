// nav.js
function syncNavbar() {
    const storedUser = localStorage.getItem('userLoggedIn');
    if (!storedUser) return;
    const user = JSON.parse(storedUser);

    // Stop di sini jika bukan admin
    if (user.role !== 'admin') return;

    const navName = document.getElementById('profile-name');
    if (!navName) return;

    // 1. Tampilkan nama dari local storage secepat mungkin
    const nameToShow = user.nama || user.username || 'Admin';
    navName.innerText = nameToShow;
    navName.style.color = 'inherit'; // Menghapus transparan
    navName.style.opacity = '1'; // Menghapus opacity 0

    // 2. Baru tarik data terbaru dari server
    fetch('/api/admin/profile')
        .then((res) => res.json())
        .then((data) => {
            if (data && data.username && navName.innerText !== data.username) {
                navName.innerText = data.username;
                // Update storage tanpa merusak field lain
                const updatedData = { ...user, nama: data.username };
                localStorage.setItem('userLoggedIn', JSON.stringify(updatedData));
            }
        })
        .catch(() => console.log('Offline: Pakai data lokal.'));
}
syncNavbar();
