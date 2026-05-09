# Terms of Service & Privacy Policy — Affterun

Selamat datang di **Affterun**! Kami sangat menghargai privasi dan keamanan data Anda. Aplikasi ini dirancang dari awal dengan prinsip **Privacy-by-Design** di mana kami berkomitmen penuh untuk tidak mengumpulkan data pribadi atau gambar Anda.

---

### 1. Model Pemrosesan Data (100% Client-Side)
Seluruh proses pembuatan poster di Affterun dilakukan secara lokal di dalam browser Anda:
- **Foto Latar Belakang:** Ketika Anda mengunggah atau memotong gambar latar belakang, gambar tersebut disimpan sementara di dalam memori React (*React state*) browser Anda. **Gambar tidak pernah diunggah ke server kami, database, atau pihak ketiga mana pun.**
- **Pemrosesan Gambar (*Cropping & Rendering*):** Proses pemotongan (*cropping*) dan penggabungan teks poster dijalankan sepenuhnya menggunakan mesin browser Anda melalui pustaka `react-easy-crop` dan `html-to-image`. Poster PNG dicetak langsung di komputer/ponsel Anda.

### 2. Kredensial & Integrasi Strava API
Untuk menampilkan data aktivitas lari atau bersepeda Anda:
- **Penyimpanan Token:** Ketika Anda menghubungkan akun Strava, kunci otentikasi (*Access Token*) disimpan secara lokal dan aman di dalam fitur browser Anda sendiri (**`localStorage`**).
- **Komunikasi Langsung:** Aplikasi mengirimkan permintaan data aktivitas langsung dari browser Anda ke endpoint Strava API secara aman. Data aktivitas tersebut hanya digunakan untuk melengkapi teks pada kanvas poster Anda dan **tidak pernah disimpan di database kami karena kami tidak memiliki database server eksternal.**

### 3. Tidak Ada Pelacakan (*No Tracking*)
Kami tidak menggunakan kuki pelacak (*tracking cookies*), piksel pemasaran, atau alat analitik perilaku pengguna yang mengganggu. Kunjungan Anda bersifat anonim sepenuhnya.

### 4. Lisensi dan Penggunaan Poster
Anda memiliki hak milik penuh 100% atas poster yang Anda hasilkan. Anda bebas menggunakannya untuk kebutuhan pribadi, membagikannya di media sosial (seperti Instagram atau Strava), atau mencetaknya secara fisik tanpa batasan hak cipta dari pihak Affterun.

---

*Kebijakan ini berlaku efektif sejak tanggal pembuatan aplikasi. Jika Anda memiliki pertanyaan atau masukan mengenai privasi aplikasi ini, silakan hubungi kami atau periksa kode sumber terbuka kami.*

**Dibuat dengan dedikasi penuh terhadap privasi oleh Abiyyu Rahman.**
