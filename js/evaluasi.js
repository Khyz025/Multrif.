/* ============================================================
   Multrif — evaluasi.js
   Data 15 soal evaluasi akhir (gabungan HTML+CSS+JS) beserta topik per soal.
   Semua istilah kode ditulis dalam bentuk teks aman (HTML-escaped)
   agar tidak dirender sebagai elemen HTML sungguhan.
   Mekanisme kuis ada di quiz.js (renderEval).
   ============================================================ */

const evalQuestions = [
  // Soal 1-5: HTML | Soal 6-10: CSS | Soal 11-15: JavaScript
  {
    question: 'Manakah pernyataan yang paling tepat menjelaskan perbedaan tag dan elemen?',
    options: ['Tag dan elemen adalah istilah yang sama persis', 'Tag adalah penanda pembuka/penutup, elemen adalah tag pembuka, isi, dan tag penutup secara keseluruhan', 'Elemen hanya dipakai untuk gambar, tag hanya dipakai untuk teks', 'Tag hanya ada di dalam head, elemen hanya ada di dalam body'],
    answer: 1,
    explain: 'Tag adalah penanda tunggal seperti p pembuka atau penutup, sedangkan elemen adalah satu kesatuan tag pembuka, isi, dan tag penutup.'
  },
  {
    question: 'Apa hasil dari kode img src logo.png jika ditampilkan di browser (tanpa atribut alt)?',
    options: ['Muncul error karena atribut alt wajib ada', 'Gambar tetap tampil normal meskipun tanpa alt', 'Tag tidak akan dirender sama sekali', 'Browser menolak menampilkan img tanpa penutup'],
    answer: 1,
    explain: 'alt disarankan untuk aksesibilitas, tetapi bukan atribut wajib agar gambar tetap tampil; img juga termasuk void element.'
  },
  {
    question: 'Anda ingin membuat tautan yang membuka kontak.html di tab baru saat diklik. Manakah kode yang tepat?',
    options: ['Menulis atribut new="true" pada tag a', 'Menulis atribut link="kontak.html" target="_blank"', 'Menulis atribut href="kontak.html" target="_blank"', 'Menggunakan tag link dengan atribut open="new"'],
    answer: 2,
    explain: 'Atribut href menentukan tujuan tautan, dan target="_blank" membuka tautan di tab baru pada tag a.'
  },
  {
    question: 'Perhatikan kode label for alamat_email dan input id email. Mengapa label tidak terhubung dengan benar ke input?',
    options: ['Karena type email tidak valid', 'Karena nilai for pada label tidak sama dengan id pada input', 'Karena label tidak boleh dipakai pada form', 'Karena input harus memiliki tag penutup'],
    answer: 1,
    explain: 'Nilai atribut for pada label harus sama persis dengan id pada elemen input agar keduanya terhubung.'
  },
  {
    question: 'Anda ingin menampilkan tiga bahan makanan dalam bentuk daftar bernomor. Tag pembungkus manakah yang paling tepat?',
    options: ['Tag ul (unordered list)', 'Tag ol (ordered list)', 'Tag table', 'Tag dl (description list)'],
    answer: 1,
    explain: 'Tag ol (ordered list) menghasilkan daftar bernomor urut secara otomatis.'
  },
  {
    question: 'Apa fungsi utama dari selector pada CSS?',
    options: ['Menentukan warna latar belakang halaman', 'Menentukan elemen HTML mana yang akan dikenai aturan gaya', 'Menentukan urutan file CSS yang dimuat', 'Menentukan jenis font yang digunakan'],
    answer: 1,
    explain: 'Selector adalah bagian dari aturan CSS yang menentukan target elemen HTML yang akan diberi gaya.'
  },
  {
    question: 'Elemen memiliki class kartu dan id kartuUtama. Manakah aturan CSS yang akan memengaruhi elemen tersebut, antara selector ID kartuUtama dengan border, dan selector class kartu-lain dengan warna merah?',
    options: ['Hanya aturan pertama (selector ID)', 'Hanya aturan kedua (selector class kartu-lain)', 'Keduanya', 'Tidak ada yang berpengaruh'],
    answer: 0,
    explain: 'Selector ID cocok dengan id elemen tersebut, sedangkan selector class kartu-lain tidak cocok karena nama class berbeda.'
  },
  {
    question: 'Sebuah elemen memiliki CSS margin: 10px; padding: 20px;. Bagian manakah yang jaraknya 20px dari isi kontennya?',
    options: ['Margin, karena mengatur jarak dari isi', 'Padding, karena mengatur jarak di dalam elemen antara isi dan border', 'Border, karena selalu mengikuti nilai terbesar', 'Tidak dapat ditentukan tanpa melihat width'],
    answer: 1,
    explain: 'Padding adalah jarak di dalam elemen, antara konten dan border/tepi elemen.'
  },
  {
    question: 'Anda ingin tiga kotak tersusun sejajar horizontal dengan jarak antar kotak menggunakan Flexbox. Manakah kombinasi CSS yang tepat pada elemen induk?',
    options: ['display: block; direction: row;', 'display: flex; gap: 16px;', 'position: absolute; float: left;', 'display: table; gap: 16px;'],
    answer: 1,
    explain: 'display: flex mengaktifkan flexbox, dan gap mengatur jarak antar elemen anak secara langsung.'
  },
  {
    question: 'Anda ingin tata letak tiga kolom berubah menjadi satu kolom saat lebar layar di bawah 600px. Manakah pendekatan yang tepat?',
    options: ['Menulis dua file HTML terpisah untuk desktop dan mobile', 'Menggunakan media query max-width 600px untuk mengubah grid-template-columns', 'Mengatur width elemen menjadi auto secara permanen', 'Tidak mungkin dilakukan hanya dengan CSS'],
    answer: 1,
    explain: 'Media query memungkinkan aturan CSS berbeda diterapkan berdasarkan kondisi lebar layar.'
  },
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
    question: 'Perhatikan function berikut. Apa yang terjadi saat dipanggil hitungLuas(4, 5)? function hitungLuas(panjang, lebar) { panjang * lebar; }',
    options: ['Menampilkan 20', 'Menampilkan undefined, karena tidak ada return', 'Menampilkan error sintaks', 'Menampilkan teks 4 5'],
    answer: 1,
    explain: 'Function menghitung panjang kali lebar tetapi tidak mengembalikan nilainya dengan return, sehingga hasilnya undefined.'
  },
  {
    question: 'Anda ingin mengubah teks elemen h2 id judul menjadi Berhasil saat tombol id btn diklik. Manakah pendekatan yang tepat?',
    options: ['Event listener dipasang pada tombol btn, lalu mengubah textContent elemen judul menjadi Berhasil', 'Event listener dipasang pada elemen judul, lalu mengubah textContent tombol btn menjadi Berhasil', 'Mengatur textContent tombol btn langsung menjadi Berhasil tanpa event listener', 'Menggunakan querySelector dengan onclick diisi teks Berhasil'],
    answer: 0,
    explain: 'Event listener harus dipasang pada tombol (btn), dan perubahan teks diarahkan ke elemen judul.'
  },
  {
    question: 'Elemen pesan (awalnya display none) ingin dimunculkan saat tombol diklik. Pendekatan manakah yang paling tepat menggunakan DOM?',
    options: ['Menghapus elemen lalu membuatnya lagi dari awal setiap kali diklik', 'Mengubah style.display elemen tersebut menjadi block melalui event listener pada tombol', 'Menulis ulang seluruh halaman HTML menggunakan JavaScript', 'Menunggu pengguna me-refresh halaman'],
    answer: 1,
    explain: 'Mengubah properti style.display melalui DOM adalah cara paling langsung dan efisien untuk menampilkan atau menyembunyikan elemen.'
  },
];

// Topik per soal (dipakai untuk rekomendasi pengulangan materi)
const evalTopics = [
  'HTML','HTML','HTML','HTML','HTML',
  'CSS','CSS','CSS','CSS','CSS',
  'JS','JS','JS','JS','JS',
];
