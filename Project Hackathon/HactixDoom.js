//Anak - Tombol penambahan dan pengurangan
let jumlahAnak = 0

const paragrafAnak = document.getElementById('p-Anak')
const spanJumlahAnak = document.getElementById('jumlahAnak')
const buttonTambahA = document.getElementById('btnPenambahanA');
const buttonKurangA = document.getElementById('btnPenguranganA');

function updateTampilAnak () {
    spanJumlahAnak.innerText = jumlahAnak;
    paragrafAnak.innerText = "Anak: " + jumlahAnak
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

const paragrafDewasa = document.getElementById('p-Dewasa')
const spanJumlahDewasa = document.getElementById('jumlahDewasa')
const buttonTambahD = document.getElementById('btnPenambahanD');
const buttonKurangD = document.getElementById('btnPenguranganD');

function updateTampilDewasa () {
    spanJumlahDewasa.innerText = jumlahDewasa;
    paragrafDewasa.innerText = "Dewasa: " + jumlahDewasa
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