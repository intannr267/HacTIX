   document.addEventListener('DOMContentLoaded', function() {
      // Set current year in footer
      document.getElementById('current-year').textContent = new Date().getFullYear();
      
      // Passenger Counter
      let jumlahAnak = 0;
      let jumlahDewasa = 0;
      const spanAnak = document.getElementById("jumlahAnak");
      const spanDewasa = document.getElementById("jumlahDewasa");
      const pAnak = document.getElementById("p-Anak");
      const pDewasa = document.getElementById("p-Dewasa");

      function updatePenumpang() {
        spanAnak.innerText = jumlahAnak;
        spanDewasa.innerText = jumlahDewasa;
        pAnak.innerText = "Anak: " + jumlahAnak;
        pDewasa.innerText = "Dewasa: " + jumlahDewasa;
      }

      document.getElementById("btnPenambahanA").onclick = () => { jumlahAnak++; updatePenumpang(); };
      document.getElementById("btnPenguranganA").onclick = () => { if (jumlahAnak > 0) jumlahAnak--; updatePenumpang(); };
      document.getElementById("btnPenambahanD").onclick = () => { jumlahDewasa++; updatePenumpang(); };
      document.getElementById("btnPenguranganD").onclick = () => { if (jumlahDewasa > 0) jumlahDewasa--; updatePenumpang(); };

      // Trip Type Tabs (synced with toggle)
      const roundTripTab = document.getElementById("round-trip-tab");
      const oneWayTab = document.getElementById("one-way-tab");
      const togglePP = document.getElementById("togglePulangPergi");
      const tanggalPergi = document.getElementById("tanggalPergi");
      const tanggalBalik = document.getElementById("tanggalBalik");
      const fieldTanggalBalik = document.getElementById("field-tanggal-balik");

      // Initialize toggle state based on active tab
      togglePP.checked = roundTripTab.classList.contains("bg-sky-600");

      // Tab click handlers
      roundTripTab.addEventListener("click", function() {
        roundTripTab.classList.add("bg-sky-600", "text-white");
        roundTripTab.classList.remove("bg-white", "hover:bg-gray-50");
        oneWayTab.classList.remove("bg-sky-600", "text-white");
        oneWayTab.classList.add("bg-white", "hover:bg-gray-50");
        togglePP.checked = true;
        fieldTanggalBalik.style.display = "block";
        tanggalBalik.disabled = false;
      });

      oneWayTab.addEventListener("click", function() {
        oneWayTab.classList.add("bg-sky-600", "text-white");
        oneWayTab.classList.remove("bg-white", "hover:bg-gray-50");
        roundTripTab.classList.remove("bg-sky-600", "text-white");
        roundTripTab.classList.add("bg-white", "hover:bg-gray-50");
        togglePP.checked = false;
        fieldTanggalBalik.style.display = "none";
        tanggalBalik.disabled = true;
        tanggalBalik.value = "";
      });

      // Toggle pulang-pergi (for compatibility with existing code)
      togglePP.addEventListener("change", function () {
        if (this.checked) {
          roundTripTab.classList.add("bg-sky-600", "text-white");
          roundTripTab.classList.remove("bg-white", "hover:bg-gray-50");
          oneWayTab.classList.remove("bg-sky-600", "text-white");
          oneWayTab.classList.add("bg-white", "hover:bg-gray-50");
          fieldTanggalBalik.style.display = "block";
          tanggalBalik.disabled = false;
        } else {
          oneWayTab.classList.add("bg-sky-600", "text-white");
          oneWayTab.classList.remove("bg-white", "hover:bg-gray-50");
          roundTripTab.classList.remove("bg-sky-600", "text-white");
          roundTripTab.classList.add("bg-white", "hover:bg-gray-50");
          fieldTanggalBalik.style.display = "none";
          tanggalBalik.disabled = true;
          tanggalBalik.value = "";
        }
      });

      // Validasi tanggal balik
      tanggalPergi.addEventListener("change", function () {
        if (!tanggalPergi.value) return;
        const minTanggal = new Date(tanggalPergi.value);
        minTanggal.setDate(minTanggal.getDate() + 1);
        const minDateString = minTanggal.toISOString().split("T")[0];
        tanggalBalik.min = minDateString;

        if (new Date(tanggalBalik.value) < new Date(minDateString)) {
          tanggalBalik.value = "";
        }
      });

      // Simpan & pindah
      document.getElementById("btnPesan").addEventListener("click", () => {
        const dari = document.getElementById("dari").value;
        const ke = document.getElementById("ke").value;
        const tanggal = tanggalPergi.value;
        const tanggalKembali = togglePP.checked ? tanggalBalik.value : null;

        if (!dari || !ke || !tanggal || (togglePP.checked && !tanggalKembali)) {
          alert("Mohon lengkapi semua data!");
          return;
        }

        const pemesanan = {
          dari, ke, tanggal,
          tanggalKembali,
          jumlahAnak, jumlahDewasa,
          perjalanan: togglePP.checked ? "pp" : "sekali"
        };

        localStorage.setItem("pemesanan", JSON.stringify(pemesanan));
        window.location.href = "form-pemesanan.html";
      });
      
      // Scrolling page - Change header background on scroll
      window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        const headerHeight = header.offsetHeight;
        const headerTitle = document.querySelector(".header-title");
        const navbarLinks = document.querySelectorAll(".navbar a");

        if (window.scrollY > headerHeight) {
          header.style.backgroundColor = "white"; // warna setelah discroll
          headerTitle.style.color = 'rgb(86, 179, 255)';
          
          // Change navbar links color
          navbarLinks.forEach(link => {
            link.style.color = '#333';
          });
        } else {
          header.style.backgroundColor = "transparent"; // warna awal
          headerTitle.style.color = 'white';
          
          // Reset navbar links color
          navbarLinks.forEach(link => {
            link.style.color = 'white';
          });
        }
      });
   });