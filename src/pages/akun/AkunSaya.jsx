// Contoh di AkunSaya.jsx
function AkunSaya() {
  return (
    <div>
      <h2>Akun Saya</h2>
      {/* Tampilkan link ke submenu */}
      <ul>
        <li><a href="/akun/profil">Profil</a></li>
        <li><a href="/akun/alamat">Alamat</a></li>
        <li><a href="/akun/ubah-password">Ubah Password</a></li>
        <li><a href="/akun/hapus-akun">Hapus Akun</a></li>
      </ul>
    </div>
  );
}

export default AkunSaya;
