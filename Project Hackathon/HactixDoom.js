//Anak - Tombol penambahan dan pengurangan
let jumlahAnak = 0

const buttonTambahA = document.getElementById('btnPenambahanA');
const buttonKurangA = document.getElementById('btnPenguranganA');
const paragrafAnak = document.getElementById('paragrafAnak')
const spanJumlahAnak = document.getElementById('jumlahAnak')

function updateTampilAnak () {
    spanJumlahAnak.innerText = jumlahAnak;
    paragrafAnak.innerText = "Jumlah tiket anak: " + jumlahAnak
}

buttonTambahA.addEventListener('click', function () {
        jumlahAnak++
        updateTampilAnak();
})

buttonKurangA.addEventListener('click', function () {
    if(jumlahAnak > 0) {
        jumlahAnak--
        updateTampilAnak()
    }
})

//Dewasa - Tombol penambahan dan pengurangan
let jumlahDewasa = 0

const paragrafDewasa = document.getElementById('paragrafDewasa')
const spanJumlahDewasa = document.getElementById('jumlahDewasa')
const buttonTambahD = document.getElementById('btnPenambahanD');
const buttonKurangD = document.getElementById('btnPenguranganD');

function updateTampilDewasa () {
    spanJumlahDewasa.innerText = jumlahDewasa;
    paragrafDewasa.innerText = "Jumlah tiket dewasa: " + jumlahDewasa
}

buttonTambahD.addEventListener('click', function () {
        jumlahDewasa++
        updateTampilDewasa();
})

buttonKurangD.addEventListener('click', function () {
    if(jumlahDewasa > 0) {
        jumlahDewasa--
        updateTampilDewasa()
    }
})