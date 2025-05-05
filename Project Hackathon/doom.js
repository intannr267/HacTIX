// Anak - Tombol penambahan dan pengurangan
let jumlahAnak = 0;

const paragrafAnak = document.getElementById('p-Anak');
const spanJumlahAnak = document.getElementById('jumlahAnak');
const buttonTambahA = document.getElementById('btnPenambahanA');
const buttonKurangA = document.getElementById('btnPenguranganA');

function updateTampilAnak() {
    spanJumlahAnak.innerText = jumlahAnak;
    paragrafAnak.innerText = "Anak: " + jumlahAnak;
}

buttonTambahA.addEventListener('click', function () {
    jumlahAnak++;
    updateTampilAnak();
});

buttonKurangA.addEventListener('click', function () {
    if (jumlahAnak > 0) {
        jumlahAnak--;
        updateTampilAnak();
    }
});

// Dewasa - Tombol penambahan dan pengurangan
let jumlahDewasa = 0;

const paragrafDewasa = document.getElementById('p-Dewasa');
const spanJumlahDewasa = document.getElementById('jumlahDewasa');
const buttonTambahD = document.getElementById('btnPenambahanD');
const buttonKurangD = document.getElementById('btnPenguranganD');

function updateTampilDewasa() {
    spanJumlahDewasa.innerText = jumlahDewasa;
    paragrafDewasa.innerText = "Dewasa: " + jumlahDewasa;
}

buttonTambahD.addEventListener('click', function () {
    jumlahDewasa++;
    updateTampilDewasa();
});

buttonKurangD.addEventListener('click', function () {
    if (jumlahDewasa > 0) {
        jumlahDewasa--;
        updateTampilDewasa();
    }
});

// Tombol Pesan
document.getElementById('btnPesan').addEventListener('click', function () {
    // Ambil nilai dari form
    const dari = document.querySelector('select[name="dari"]').value;
    const ke = document.querySelector('select[name="ke"]').value;
    const tanggal = document.querySelector('input[name="tanggal"]').value;
    const sampai = document.querySelector('input[name="sampai"]').value;
    
    // Validasi input
    if (!dari || !ke || !tanggal || !sampai || jumlahAnak === 0 && jumlahDewasa === 0) {
        alert("Harap lengkapi semua data pemesanan.");
        return;
    }

    // Simpan data pemesanan ke sessionStorage
    const pemesananData = {
        dari: dari,
        ke: ke,
        tanggal: tanggal,
        sampai: sampai,
        jumlahAnak: jumlahAnak,
        jumlahDewasa: jumlahDewasa
    };

    sessionStorage.setItem('pemesanan', JSON.stringify(pemesananData));

    // Arahkan ke halaman list pesawat
    window.location.href = "IndexListPesawat.html";
});
