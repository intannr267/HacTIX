// Ambil data pemesanan dari localStorage
const data = JSON.parse(localStorage.getItem("pemesanan"));

if (!data) {
    document.body.innerHTML = "<p>Data pemesanan tidak ditemukan. Silakan kembali ke halaman awal.</p>";
} else {
    // Contoh daftar pesawat
    const daftarPesawat = [
    {
        maskapai: "HACTIV AIR",
        kode: "HA123",
        jam: "08:00 AM",
        tiba: "9.15 AM",
        asal: 'IND',
        durasi: '1h 15m',
        direct: true,
        tujuan: 'IND',
        harga: 1200000,
        kabin: '1 bag (15kg)',
        bagasi: '1 bag (18kg)',
        pesawat: 'Haair 151-11',
        jarak: '890 miles',
        wifi: true,
        hiburan: true,
        makanan: true,
    },
    {
        maskapai: "Air HACTIV",
        kode: "AH456",
        jam: "10:30 AM",
        tiba: "12.45 PM",
        asal: 'IND',
        durasi: '2h 15m',
        direct: true,
        tujuan: 'IND',
        harga: 950000,
        kabin: '1 bag (10kg)',
        bagasi: '1 bag (15kg)',
        pesawat: 'Aitiv 210-15',
        jarak: '1,300 miles',
        wifi: true,
        makanan: true
    },
    {
        maskapai: "HACTIV JET",
        kode: "HJ789",
        jam: "13:15 PM",
        tiba: "16.30 PM",
        asal: 'IND',
        durasi: '3h 15m',
        direct: true,
        tujuan: 'IND',
        harga: 850000,
        kabin: '1 bag (7kg)',
        bagasi: '1 bag (10kg)',
        pesawat: 'Haje 180-55',
        jarak: '1,870 miles',
        wifi: true
    }
    ];

    const container = document.getElementById("daftarPesawat");

    // Tampilkan setiap pesawat
    daftarPesawat.forEach(pesawat => {
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
        <div class="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 ">
    <div class="flex items-center gap-3">
        <img src="https://placehold.co/40x40/black/white?text=${pesawat.kode.slice(0, 2)}" alt="${pesawat.maskapai}" class="h-10 w-10 rounded-full">
        <div>
        <div class="font-medium">${pesawat.maskapai}</div>
        <div class="text-xs text-gray-500">Flight #${pesawat.kode}</div>
        </div>
    </div>
    <div class="flex flex-col justify-center">
        <div class="flex items-center gap-3">
        <div class="text-lg font-semibold">${pesawat.jam}</div>
        <div class="text-xs text-gray-500">${pesawat.asal}</div>
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-500">
        <i class="fas fa-clock"></i>
        ${pesawat.durasi}
        <span class="text-green-600">• ${pesawat.direct ? "Non-stop" : "Transit"}</span>
        </div>
        <div class="flex items-center gap-3">
        <div class="text-lg font-semibold">${pesawat.tiba}</div>
        <div class="text-xs text-gray-500">${pesawat.tujuan}</div>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center">
        <div class="flex items-center gap-1">
        <i class="fas fa-plane text-sky-600"></i>
        <span class="text-sm">${pesawat.direct ? "Direct Flight" : "With Transit"}</span>
        </div>
    </div>
    <div class="flex flex-col justify-center items-end">
        <div class="text-2xl font-bold text-blac-600">Rp ${pesawat.harga.toLocaleString("id-ID")}</div>
        <div class="text-xs text-gray-500">per orang</div>
        <button class="mt-2 bg-black-600 hover:bg-black-700 text-white px-4 py-2 rounded-md text-sm font-medium" 
        onclick="pilihPesawat('${pesawat.maskapai}', '${pesawat.kode}', '${pesawat.jam}', ${pesawat.harga}, '${pesawat.tiba}', '${pesawat.durasi}')">
        Pilih
        </button>
    </div>
    </div>
    <div class="bg-slate-50 p-3 text-center text-sm text-sky-700 font-medium cursor-pointer hover:bg-blue-500 hover:text-white [box-shadow:2px_3px_2px_rgba(0,0,0,0.15)] rounded-md transition-all duration-200" onclick="this.nextElementSibling.classList.toggle('hidden')">
    Tampilkan detail penerbangan
    </div>
    <div class="hidden p-4 bg-gray-50 border-t text-xs text-gray-500 [box-shadow:2px_3px_2px_rgba(0,0,0,0.15)]">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
        <h4 class="text-sm font-medium mb-2">Detail Penerbangan</h4>
        <ul class="space-y-1">
            <li>Pesawat: ${pesawat.pesawat}</li>
            <li>Durasi: ${pesawat.durasi}</li>
            <li>Jarak: ${pesawat.jarak}</li>
        </ul>
        </div>
        <div>
        <h4 class="text-sm font-medium mb-2">Fasilitas</h4>
        <ul class="space-y-1">
            <li>${pesawat.wifi ? '<i class="fas fa-wifi mr-1"></i> Wi-Fi Tersedia' : ''}</li>
            <li>${pesawat.hiburan ? '<i class="fas fa-tv mr-1"></i> Hiburan dalam pesawat' : ''}</li>
            <li>${pesawat.makanan ? '<i class="fas fa-utensils mr-1"></i> Makanan tersedia' : ''}</li>
        </ul>
        </div>
        <div>
        <h4 class="text-sm font-medium mb-2">Bagasi</h4>
        <ul class="space-y-1">
            <li>Cabin: ${pesawat.kabin} termasuk</li>
            <li>Bagasi: ${pesawat.bagasi} termasuk</li>
        </ul>
        </div>
    </div>
    </div>
    `;
    container.appendChild(card);
    });
}

// Ubah nilai-nilai elemen sesuai data yang disimpan
document.getElementById("from").textContent = data.dari;
document.getElementById("to").textContent = data.ke;
document.getElementById("date").textContent = data.tanggal;
document.getElementById("passengers").textContent = `${data.jumlahDewasa} Dewasa, ${data.jumlahAnak} Anak`;

// UPDATED: Fungsi untuk memilih pesawat - now includes tiba (arrival time) and durasi (duration)
function pilihPesawat(maskapai, kode, jam, harga, tiba, durasi) {
    // Menyimpan data pesawat yang dipilih di localStorage
    const pesawatDipilih = { 
    maskapai, 
    kode, 
    jam, 
    harga,
    jamTiba: tiba,  
    durasi         
    };

    // Simpan pemesanan yang sudah ditambahkan pesawatnya
    const pemesanan = JSON.parse(localStorage.getItem("pemesanan"));
    pemesanan.pesawatDipilih = pesawatDipilih;
    localStorage.setItem("pemesanan", JSON.stringify(pemesanan));

    // Redirect ke form pemesanan
    window.location.href = "form-booking.html";
}