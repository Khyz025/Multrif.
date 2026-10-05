/* ============================================================
   Multrif — quiz-materi.js
   Data soal latihan singkat per materi (5 soal per materi).
   Semua tag kode ditulis dalam bentuk teks aman (HTML-escaped)
   agar tidak dirender sebagai elemen HTML sungguhan.
   Mekanisme penilaian ada di quiz.js (renderMiniQuiz).
   ============================================================ */

/* ---------- Kuis HTML ---------- */
const quizHTML = [
  {
    question: 'Manakah pasangan tag dan penutupnya yang benar?',
    options: ['&lt;p&gt;...&lt;p/&gt;', '&lt;p&gt;...&lt;/p&gt;', '&lt;p/&gt;...&lt;/p&gt;', '&lt;p&gt;...&lt;\\p&gt;'],
    answer: 1,
    explain: 'Tag penutup selalu diawali garis miring sebelum nama tag, ditulis &lt;/p&gt;.'
  },
  {
    question: 'Apa fungsi utama atribut alt pada tag &lt;img&gt;?',
    options: ['Mengubah ukuran gambar', 'Menampilkan teks alternatif saat gambar gagal dimuat', 'Mengganti warna gambar', 'Mempercepat proses loading gambar'],
    answer: 1,
    explain: 'Atribut alt menampilkan teks pengganti dan membantu aksesibilitas ketika gambar gagal dimuat.'
  },
  {
    question: 'Apa hasil dari kode &lt;ol&gt;&lt;li&gt;Buka Editor&lt;/li&gt;&lt;li&gt;Tulis Kode&lt;/li&gt;&lt;/ol&gt; saat ditampilkan di browser?',
    options: ['Daftar dengan bullet', 'Daftar dengan angka urut', 'Teks biasa tanpa format', 'Error karena ol tidak valid'],
    answer: 1,
    explain: 'Tag ol (ordered list) menghasilkan daftar berurutan bernomor, berbeda dari ul yang menghasilkan bullet.'
  },
  {
    question: 'Atribut apa yang membuat sebuah tautan &lt;a&gt; terbuka di tab baru?',
    options: ['href', 'target="_blank"', 'rel', 'title'],
    answer: 1,
    explain: 'target="_blank" membuka tautan pada tab baru, sedangkan href hanya menentukan tujuan tautan.'
  },
  {
    question: 'Pada kode &lt;label for="nama"&gt;Nama:&lt;/label&gt; dan &lt;input id="nm"&gt;, mengapa label tidak terhubung dengan benar ke input?',
    options: ['Karena tipe input salah', 'Karena nilai for pada label tidak sama dengan id pada input', 'Karena label harus diletakkan di luar form', 'Karena input membutuhkan atribut value'],
    answer: 1,
    explain: 'Nilai atribut for pada label harus sama persis dengan id pada input agar keduanya terhubung.'
  },
];

/* ---------- Kuis CSS ---------- */
const quizCSS = [
  {
    question: 'Apa fungsi utama selector pada CSS?',
    options: ['Menentukan warna latar belakang halaman', 'Menentukan elemen HTML mana yang dikenai aturan gaya', 'Menentukan urutan file CSS yang dimuat', 'Menentukan jenis font yang dipakai'],
    answer: 1,
    explain: 'Selector adalah bagian aturan CSS yang menentukan elemen HTML mana yang menjadi target gaya.'
  },
  {
    question: 'Elemen memiliki class kartu dan id kartuUtama. Aturan CSS nomor pagar kartuUtama{border:2px solid black;} dan titik kartu-lain{color:red;} manakah yang berlaku?',
    options: ['Keduanya berlaku', 'Hanya aturan pertama', 'Hanya aturan kedua', 'Tidak ada yang berlaku'],
    answer: 1,
    explain: 'Selector ID cocok dengan id elemen, sedangkan selector class lain tidak cocok karena nama class berbeda.'
  },
  {
    question: 'Sebuah elemen memiliki margin: 10px; padding: 20px;. Bagian mana yang berjarak 20px dari isi kontennya?',
    options: ['Margin', 'Padding', 'Border, mengikuti nilai terbesar', 'Tidak dapat ditentukan'],
    answer: 1,
    explain: 'Padding adalah jarak di dalam elemen, antara konten dan border, sedangkan margin adalah jarak di luar elemen.'
  },
  {
    question: 'Manakah kombinasi CSS yang tepat agar tiga kotak tersusun sejajar horizontal dengan jarak antar kotak memakai Flexbox?',
    options: ['display: block; direction: row;', 'display: flex; gap: 16px;', 'position: absolute; float: left;', 'display: table; gap: 16px;'],
    answer: 1,
    explain: 'display: flex mengaktifkan Flexbox, dan gap mengatur jarak antar elemen anak secara langsung.'
  },
  {
    question: 'Bagaimana cara yang tepat agar tiga kolom berubah menjadi satu kolom saat lebar layar di bawah 600px?',
    options: ['Membuat dua file HTML terpisah untuk desktop dan mobile', 'Menggunakan media query max-width 600px untuk mengubah grid-template-columns', 'Mengatur width menjadi auto secara permanen', 'Tidak mungkin dilakukan hanya dengan CSS'],
    answer: 1,
    explain: 'Media query memungkinkan aturan CSS berbeda diterapkan berdasarkan lebar layar tanpa mengubah HTML.'
  },
];

/* ---------- Kuis JavaScript ---------- */
const quizJS = [
  {
    question: 'Apa perbedaan utama antara let dan const dalam JavaScript?',
    options: ['let hanya untuk angka, const hanya untuk teks', 'Nilai let dapat diubah setelah didefinisikan, nilai const tidak', 'const hanya bisa dipakai di dalam function', 'Tidak ada perbedaan, keduanya identik'],
    answer: 1,
    explain: 'const mendefinisikan variabel dengan nilai tetap, sedangkan let memungkinkan nilai diubah kembali.'
  },
  {
    question: 'Apa hasil dari kode berikut? let skor = 40; if (skor &gt;= 60) { console.log(\'Lulus\'); } else { console.log(\'Tidak Lulus\'); }',
    options: ['Lulus', 'Tidak Lulus', 'undefined', 'Error karena tidak ada return'],
    answer: 1,
    explain: 'Karena skor (40) tidak memenuhi kondisi lebih besar sama dengan 60, program menjalankan blok else.'
  },
  {
    question: 'Function berikut dipanggil hitungLuas(4, 5). Apa hasilnya? function hitungLuas(p, l) { p * l; }',
    options: ['Menampilkan 20', 'Menampilkan undefined karena tidak ada return', 'Menampilkan error sintaks', 'Menampilkan teks 4 5'],
    answer: 1,
    explain: 'Function menghitung p kali l tetapi tidak mengembalikan nilainya dengan return, sehingga hasilnya undefined.'
  },
  {
    question: 'Manakah event listener yang tepat agar teks elemen id status berubah menjadi Selesai saat tombol id tombolSelesai diklik?',
    options: ['Event listener dipasang pada elemen status, mengubah textContent tombolSelesai', 'Event listener dipasang pada tombolSelesai, lalu mengubah textContent elemen status menjadi Selesai', 'Mengatur textContent tombolSelesai langsung menjadi Selesai', 'Menggunakan querySelector dengan onclick diisi teks Selesai'],
    answer: 1,
    explain: 'Event listener dipasang pada tombol, dan perubahan teks diarahkan ke elemen status menggunakan textContent.'
  },
  {
    question: 'Elemen pesan tersembunyi (display none) ingin dimunculkan saat tombol diklik. Pendekatan DOM apa yang paling tepat?',
    options: ['Menghapus elemen lalu membuatnya lagi dari awal', 'Mengubah style.display elemen tersebut menjadi block lewat event listener pada tombol', 'Menulis ulang seluruh halaman HTML memakai JavaScript', 'Menunggu pengguna me-refresh halaman'],
    answer: 1,
    explain: 'Mengubah properti style.display lewat DOM adalah cara paling langsung menampilkan atau menyembunyikan elemen.'
  },
];
