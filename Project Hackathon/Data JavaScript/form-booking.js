  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
    
  // Load booking data from localStorage
  const data = JSON.parse(localStorage.getItem("pemesanan"));
  const container = document.getElementById("container-penumpang");
  const summaryInfo = document.getElementById("summaryInfo");
  const priceSummary = document.getElementById("priceSummary");
  const routeSummary = document.getElementById("routeSummary");
  
  // Global variables to store booking data
  let bookingData = {
    flightDetails: {},
    passengers: [],
    pricing: {}
  };
  
  // Check if data exists
  if (!data) {
    document.body.innerHTML = "<div class='container mx-auto p-8 text-center'><p class='text-xl'>Data pemesanan tidak ditemukan. Silakan kembali ke halaman awal.</p></div>";
  } else {
    // Store flight details in bookingData
    bookingData.flightDetails = {
      maskapai: data.pesawatDipilih.maskapai,
      kode: data.pesawatDipilih.kode,
      dari: data.dari,
      ke: data.ke,
      tanggal: data.tanggal,
      jam: data.pesawatDipilih.jam,
      jamTiba: data.pesawatDipilih.jamTiba || "Perkiraan",
      durasi: data.pesawatDipilih.durasi || "2j 30m",
      kelas: "Ekonomi"
    };
    
    // Display flight summary
    const pesawat = data.pesawatDipilih;
    summaryInfo.innerHTML = `
      <!-- Airline Info -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <img src="https://placehold.co/40x40/sky/white?text=${pesawat.kode.substring(0, 2)}" alt="${pesawat.maskapai}" class="h-10 w-10 rounded-full">
          <div>
            <div class="font-medium">${pesawat.maskapai}</div>
            <div class="text-xs text-gray-500">Penerbangan #${pesawat.kode}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-medium">Ekonomi</div>
          <div class="text-xs text-gray-500">${data.tanggal}</div>
        </div>
      </div>
      
      <!-- Flight Route -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <div class="text-sm text-gray-500">Keberangkatan</div>
          <div class="text-lg font-semibold">${pesawat.jam}</div>
          <div class="text-sm">${data.dari}</div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <div class="text-xs text-gray-500 mb-1">${pesawat.durasi || "2j 30m"}</div>
          <div class="relative w-full flex items-center">
            <div class="h-0.5 bg-sky-200 w-full"></div>
            <i class="fas fa-plane absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-600 transform -rotate-90"></i>
          </div>
          <div class="text-xs text-green-600 mt-1">Langsung</div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">Kedatangan</div>
          <div class="text-lg font-semibold">${pesawat.jamTiba || "Perkiraan"}</div>
          <div class="text-sm">${data.ke}</div>
        </div>
      </div>
    `;
    
    // Update route summary
    routeSummary.textContent = `Penerbangan dari ${data.dari} ke ${data.ke}`;
    
    // Calculate pricing
    const adultTotal = pesawat.harga * data.jumlahDewasa;
    const childTotal = pesawat.harga * 0.75 * data.jumlahAnak; // 25% discount for children
    const taxes = (adultTotal + childTotal) * 0.1; // 10% taxes
    const total = adultTotal + childTotal + taxes;
    
    // Store pricing in bookingData
    bookingData.pricing = {
      adultFare: pesawat.harga,
      adultCount: data.jumlahDewasa,
      adultTotal: adultTotal,
      childFare: pesawat.harga * 0.75,
      childCount: data.jumlahAnak,
      childTotal: childTotal,
      taxes: taxes,
      total: total
    };
    
    // Update price summary
    priceSummary.innerHTML = `
      <div class="flex justify-between">
        <span class="text-sm">Dewasa (${data.jumlahDewasa})</span>
        <span class="text-sm">Rp ${adultTotal.toLocaleString("id-ID")}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-sm">Anak (${data.jumlahAnak})</span>
        <span class="text-sm">Rp ${childTotal.toLocaleString("id-ID")}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-sm">Pajak & Biaya</span>
        <span class="text-sm">Rp ${taxes.toLocaleString("id-ID")}</span>
      </div>
      <hr>
      <div class="flex justify-between font-medium">
        <span>Total</span>
        <span>Rp ${total.toLocaleString("id-ID")}</span>
      </div>
    `;
    
    // Generate passenger forms
    let index = 1;
    
    // Adult passengers
    for (let i = 0; i < data.jumlahDewasa; i++) {
      const div = document.createElement("div");
      div.className = "form-group border-b pb-6 mb-6";
      div.innerHTML = `
        <h3 class="text-lg font-semibold mb-4">Penumpang Dewasa ${index}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="nama_d_${i}" class="block text-sm font-medium">Nama Lengkap</label>
            <input id="nama_d_${i}" name="nama_d_${i}" type="text" required 
                   class="w-full rounded-md border border-gray-300 py-2 px-3">
          </div>
          <div class="space-y-2">
            <label for="nik_d_${i}" class="block text-sm font-medium">NIK</label>
            <input id="nik_d_${i}" name="nik_d_${i}" type="text" required pattern="\\d{16}" placeholder="16 digit NIK" 
                   class="w-full rounded-md border border-gray-300 py-2 px-3">
          </div>
        </div>
      `;
      container.appendChild(div);
      index++;
    }
    
    // Child passengers - now with NIK field
    for (let i = 0; i < data.jumlahAnak; i++) {
      const div = document.createElement("div");
      div.className = "form-group border-b pb-6 mb-6";
      div.innerHTML = `
        <h3 class="text-lg font-semibold mb-4">Penumpang Anak ${index}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="nama_a_${i}" class="block text-sm font-medium">Nama Lengkap</label>
            <input id="nama_a_${i}" name="nama_a_${i}" type="text" required 
                   class="w-full rounded-md border border-gray-300 py-2 px-3">
          </div>
          <div class="space-y-2">
            <label for="nik_a_${i}" class="block text-sm font-medium">NIK</label>
            <input id="nik_a_${i}" name="nik_a_${i}" type="text" required pattern="\\d{16}" placeholder="16 digit NIK" 
                   class="w-full rounded-md border border-gray-300 py-2 px-3">
          </div>
        </div>
      `;
      container.appendChild(div);
      index++;
    }
  }
  
  // Handle form submission
  document.getElementById("form-penumpang").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const entries = Array.from(formData.entries());
  
    // Process passenger data
    const passengers = [];
  
    // Process adult passengers
    for (let i = 0; i < data.jumlahDewasa; i++) {
      const nama = formData.get(`nama_d_${i}`);
      const nik = formData.get(`nik_d_${i}`);
  
      if (nama && nik) {
        passengers.push({
          type: "Dewasa",
          name: nama,
          nik: nik
        });
      }
    }
  
    // Process child passengers
    for (let i = 0; i < data.jumlahAnak; i++) {
      const nama = formData.get(`nama_a_${i}`);
      const nik = formData.get(`nik_a_${i}`);
  
      if (nama && nik) {
        passengers.push({
          type: "Anak",
          name: nama,
          nik: nik
        });
      }
    }
  
    // Store passenger data
    bookingData.passengers = passengers;
  
    // Save to localStorage
    localStorage.setItem("dataPenumpang", JSON.stringify(passengers));
    localStorage.setItem("bookingComplete", JSON.stringify(bookingData));
  
    // Show success message
    alert("Data penumpang berhasil disimpan. Silakan klik 'Selesaikan Pemesanan' untuk melanjutkan.");
  });
  
  // Complete booking button
  document.getElementById("completeBookingBtn").addEventListener("click", function() {
    // Check if passenger data is available
    const passengerData = localStorage.getItem("dataPenumpang");
    
    if (passengerData) {
      // Generate PDF preview
      const bookingComplete = JSON.parse(localStorage.getItem("bookingComplete"));
      generatePdfPreview(bookingComplete);
    } else {
      alert("Silakan isi data penumpang terlebih dahulu dan klik 'Lanjutkan'.");
    }
  });
    