
// Generate PDF preview
function generatePdfPreview(bookingData) {
    const pdfPreview = document.getElementById("pdfPreview");
    const modal = document.getElementById("pdfModal");
    
    // Create PDF preview content
    pdfPreview.innerHTML = `
        <div class="pdf-content">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6 pb-4 border-b">
            <div class="flex items-center gap-2">
            <span class="text-sky-600 text-3xl font-bold">Hack</span>
            <span class="text-3xl font-bold">TIX</span>
            </div>
            <div class="text-sm text-gray-500">E-Tiket Penerbangan</div>
        </div>
        
        <!-- Booking Reference -->
        <div class="bg-sky-50 p-4 rounded-lg mb-6">
            <div class="flex justify-between items-center">
            <div>
                <div class="text-sm text-gray-500">Kode Booking</div>
                <div class="text-xl font-bold">${generateBookingCode()}</div>
            </div>
            <div class="text-right">
                <div class="text-sm text-gray-500">Tanggal Pemesanan</div>
                <div class="font-medium">${new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
            </div>
            </div>
        </div>
        
        <!-- Flight Details -->
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Detail Penerbangan</h3>
            <div class="bg-white border rounded-lg p-4">
            <!-- Airline Info -->
            <div class="flex items-center gap-3 mb-4 pb-3 border-b">
                <img src="https://placehold.co/40x40/sky/white?text=${bookingData.flightDetails.kode.substring(0, 2)}" alt="${bookingData.flightDetails.maskapai}" class="h-10 w-10 rounded-full">
                <div>
                <div class="font-medium">${bookingData.flightDetails.maskapai}</div>
                <div class="text-xs text-gray-500">Penerbangan #${bookingData.flightDetails.kode}</div>
                </div>
                <div class="ml-auto text-right">
                <div class="text-sm font-medium">${bookingData.flightDetails.kelas}</div>
                <div class="text-xs text-gray-500">${bookingData.flightDetails.tanggal}</div>
                </div>
            </div>
            
            <!-- Flight Route -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                <div class="text-sm text-gray-500">Keberangkatan</div>
                <div class="text-lg font-semibold">${bookingData.flightDetails.jam}</div>
                <div class="text-sm">${bookingData.flightDetails.dari}</div>
                </div>
                <div class="flex flex-col items-center justify-center">
                <div class="text-xs text-gray-500 mb-1">${bookingData.flightDetails.durasi}</div>
                <div class="relative w-full flex items-center">
                    <div class="h-0.5 bg-sky-200 w-full"></div>
                    <i class="fas fa-plane absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-600 transform -rotate-90"></i>
                </div>
                <div class="text-xs text-green-600 mt-1">Langsung</div>
                </div>
                <div class="text-right">
                <div class="text-sm text-gray-500">Kedatangan</div>
                <div class="text-lg font-semibold">${bookingData.flightDetails.jamTiba}</div>
                <div class="text-sm">${bookingData.flightDetails.ke}</div>
                </div>
            </div>
            </div>
        </div>
        
        <!-- Passenger Details -->
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Detail Penumpang</h3>
            <div class="bg-white border rounded-lg overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">No.</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Tipe</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Nama</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">NIK</th>
                </tr>
                </thead>
                <tbody class="divide-y">
                ${bookingData.passengers.map((passenger, index) => `
                    <tr>
                    <td class="px-4 py-3 text-sm">${index + 1}</td>
                    <td class="px-4 py-3 text-sm">${passenger.type}</td>
                    <td class="px-4 py-3 text-sm font-medium">${passenger.name}</td>
                    <td class="px-4 py-3 text-sm">${passenger.nik}</td>
                    </tr>
                `).join('')}
                </tbody>
            </table>
            </div>
        </div>
        
        <!-- Price Summary -->
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Ringkasan Harga</h3>
            <div class="bg-white border rounded-lg p-4">
            <div class="space-y-2">
                <div class="flex justify-between">
                <span class="text-sm">Dewasa (${bookingData.pricing.adultCount})</span>
                <span class="text-sm">Rp ${bookingData.pricing.adultTotal.toLocaleString("id-ID")}</span>
                </div>
                <div class="flex justify-between">
                <span class="text-sm">Anak (${bookingData.pricing.childCount})</span>
                <span class="text-sm">Rp ${bookingData.pricing.childTotal.toLocaleString("id-ID")}</span>
                </div>
                <div class="flex justify-between">
                <span class="text-sm">Pajak & Biaya</span>
                <span class="text-sm">Rp ${bookingData.pricing.taxes.toLocaleString("id-ID")}</span>
                </div>
                <hr>
                <div class="flex justify-between font-medium">
                <span>Total</span>
                <span>Rp ${bookingData.pricing.total.toLocaleString("id-ID")}</span>
                </div>
            </div>
            </div>
        </div>
        
        <!-- Payment Section -->
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Metode Pembayaran</h3>
            <div class="bg-white border rounded-lg p-4">
            <div class="flex flex-col items-center">
                <p class="text-center mb-3">Silakan scan kode QRIS di bawah ini untuk melakukan pembayaran</p>
                <div class="border p-2 mb-3">
                <img src="https://placehold.co/200x200/sky/white?text=QRIS" alt="QRIS Code" class="h-48 w-48">
                </div>
                <p class="text-sm text-gray-500 mb-1">ID Pembayaran: HACKTIX-${generateBookingCode()}</p>
                <p class="text-sm text-gray-500">Jumlah: Rp ${bookingData.pricing.total.toLocaleString("id-ID")}</p>
                <div class="mt-4 p-3 bg-yellow-50 rounded-md text-sm">
                <p class="text-center font-medium text-yellow-700">Pembayaran akan kedaluwarsa dalam 24 jam</p>
                </div>
            </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="mt-8 pt-4 border-t text-center text-sm text-gray-500">
            <p>Terima kasih telah memilih HackTIX untuk perjalanan Anda.</p>
            <p class="mt-1">Untuk bantuan, hubungi kami di support@hacktix.com atau +62 899-8021-267</p>
        </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = "flex";
    setTimeout(() => {
        modal.querySelector(".bg-white").style.opacity = "1";
        modal.querySelector(".bg-white").style.transform = "scale(1)";
    }, 10);
    }
    
    // Generate random booking code
    function generateBookingCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
    }
    
    // Close PDF modal
    document.getElementById("closePdfBtn").addEventListener("click", function() {
    const modal = document.getElementById("pdfModal");
    const modalContent = modal.querySelector(".bg-white");
    
    modalContent.style.opacity = "0";
    modalContent.style.transform = "scale(0.95)";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
    });
    
    // Edit booking button
    document.getElementById("editBookingBtn").addEventListener("click", function() {
    const modal = document.getElementById("pdfModal");
    const modalContent = modal.querySelector(".bg-white");
    
    modalContent.style.opacity = "0";
    modalContent.style.transform = "scale(0.95)";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
    });
    
    document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById("downloadPdfBtn");
    if (downloadBtn) {
    const newBtn = downloadBtn.cloneNode(true);
    downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);
    
    // Tambahkan event listener baru
    newBtn.addEventListener("click", function() {
        // Show loading indicator
        const loadingHtml = `
        <div id="pdfLoading" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background-color: rgba(255, 255, 255, 0.8); display: flex; flex-direction: column; 
        justify-content: center; align-items: center; z-index: 2000;">
            <div style="border: 5px solid #f3f3f3; border-top: 5px solid #0284c7; border-radius: 50%; 
            width: 50px; height: 50px; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px;">Generating your invoice...</p>
        </div>
        <style>
            @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
        </style>
        `;
        document.body.insertAdjacentHTML('beforeend', loadingHtml);
        
        // Get booking data
        const bookingComplete = JSON.parse(localStorage.getItem("bookingComplete"));
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
        alert('Error: jsPDF library not loaded. Please refresh the page and try again.');
        const loadingElement = document.getElementById('pdfLoading');
        if (loadingElement) loadingElement.remove();
        return;
        }
        
        // Generate and download PDF directly
        setTimeout(() => {
        generateAndDownloadPDF(bookingComplete);
        }, 300);
    });
    }
});

/* --------------------------------------------------------------------------------------------------------- */

// Function to generate and download PDF
function generateAndDownloadPDF(bookingData) {
try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    // Generate booking code
    function generateBookingCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
    }
    
    // Generate booking code and booking date
    const bookingCode = generateBookingCode();
    const bookingDate = new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
    
    // Get primary passenger (first adult)
    let primaryPassenger = "Guest";
    if (bookingData.passengers && bookingData.passengers.length > 0) {
    const adultPassenger = bookingData.passengers.find(p => p.type === "Dewasa");
    primaryPassenger = adultPassenger ? adultPassenger.name : bookingData.passengers[0].name;
    }
    
    // Set PDF properties
    pdf.setProperties({
    title: 'HackTIX E-Ticket',
    subject: 'Flight Booking',
    author: 'HackTIX',
    keywords: 'ticket, flight, booking',
    creator: 'HackTIX Booking System'
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
    const margin = 20;
    
    // ===== HEADER SECTION =====
    // Add logo and title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(8, 132, 199); // Sky blue color
    pdf.text("Hack", margin, 20);

    pdf.setTextColor(0, 0, 0);
    pdf.text("TIX", margin + 19, 20);

    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text("E-Tiket Penerbangan", pageWidth - margin, 20, { align: "right" });
    
    // Add booking reference
    pdf.setDrawColor(240, 249, 255);
    pdf.setFillColor(240, 249, 255);
    pdf.rect(margin, 25, pageWidth - (margin * 2), 18, 'F');
    
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Kode Booking", margin + 5, 32);
    
    pdf.setFontSize(12);
    pdf.setTextColor(8, 132, 199);
    pdf.setFont(undefined, 'bold');
    pdf.text(bookingCode, margin + 5, 40);
    
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, 'normal');
    pdf.text("Tanggal Pemesanan", pageWidth - margin - 5, 32, { align: "right" });
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(bookingDate, pageWidth - margin - 5, 40, { align: "right" });
    
    // ===== FLIGHT DETAILS SECTION =====
    const flightSectionY = 50;
    
    // Section title
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text("Detail Penerbangan", margin, flightSectionY);
    
    // Draw a line under the section title
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, flightSectionY + 3, margin + 60, flightSectionY + 3);
    
    // Flight box
    pdf.setDrawColor(240, 240, 240);
    pdf.setFillColor(250, 250, 250);
    pdf.roundedRect(margin, flightSectionY + 8, pageWidth - (margin * 2), 40, 2, 2, 'F');
    
    // Airline info
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(bookingData.flightDetails.maskapai, margin + 5, flightSectionY + 18);
    
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Penerbangan #${bookingData.flightDetails.kode}`, margin + 5, flightSectionY + 24);
    
    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);
    pdf.text(bookingData.flightDetails.kelas, pageWidth - margin - 5, flightSectionY + 18, { align: "right" });
    
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(bookingData.flightDetails.tanggal, pageWidth - margin - 5, flightSectionY + 24, { align: "right" });
    
    // Divider line
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin + 5, flightSectionY + 28, pageWidth - margin - 5, flightSectionY + 28);
    
    // Flight route
    // Departure
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Keberangkatan", margin + 5, flightSectionY + 35);
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text(bookingData.flightDetails.jam, margin + 5, flightSectionY + 42);
    
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    pdf.text(bookingData.flightDetails.dari, margin + 5, flightSectionY + 48);
    
    // Flight path
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(bookingData.flightDetails.durasi, centerX, flightSectionY + 35, { align: "center" });
    
    // Draw flight path line
    pdf.setDrawColor(200, 230, 250);
    pdf.setLineWidth(0.5);
    pdf.line(margin + 40, flightSectionY + 42, pageWidth - margin - 40, flightSectionY + 42);
    
    // Add plane icon (simplified)
    pdf.setFillColor(8, 132, 199);
    pdf.circle(centerX, flightSectionY + 42, 2, 'F');
    
    pdf.setFontSize(7);
    pdf.setTextColor(22, 163, 74);
    pdf.text("Langsung", centerX, flightSectionY + 48, { align: "center" });
    
    // Arrival
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Kedatangan", pageWidth - margin - 5, flightSectionY + 35, { align: "right" });
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text(bookingData.flightDetails.jamTiba, pageWidth - margin - 5, flightSectionY + 42, { align: "right" });
    
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    pdf.text(bookingData.flightDetails.ke, pageWidth - margin - 5, flightSectionY + 48, { align: "right" });
    
    // ===== PASSENGER DETAILS SECTION =====
    const passengerSectionY = flightSectionY + 62;
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text("Detail Penumpang", margin, passengerSectionY);
    
    // Draw a line under the section title
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, passengerSectionY + 3, margin + 60, passengerSectionY + 3);
    
    // Check if autoTable plugin is available
    if (typeof pdf.autoTable === 'undefined') {
    // Fallback if autoTable is not available
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Daftar Penumpang:", margin, passengerSectionY + 13);
    
    let passengerY = passengerSectionY + 23;
    bookingData.passengers.forEach((passenger, index) => {
        pdf.setFontSize(9);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`${index + 1}. ${passenger.type}: ${passenger.name} (NIK: ${passenger.nik})`, margin + 5, passengerY);
        passengerY += 8;
    });
    } else {
    // Use autoTable if available
    const passengerTableHeaders = [['No.', 'Tipe', 'Nama', 'NIK']];
    const passengerTableData = bookingData.passengers.map((passenger, index) => [
        (index + 1).toString(),
        passenger.type,
        passenger.name,
        passenger.nik
    ]);
    
    pdf.autoTable({
        head: passengerTableHeaders,
        body: passengerTableData,
        startY: passengerSectionY + 8,
        theme: 'grid',
        headStyles: {
        fillColor: [241, 245, 249],
        textColor: [100, 116, 139],
        fontStyle: 'normal'
        },
        styles: {
        fontSize: 9,
        cellPadding: 4
        },
        columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 30 },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 40 }
        },
        margin: { left: margin, right: margin }
    });
    }
    
    // Get the Y position after passenger table
    let currentY = passengerSectionY + 35;
    if (typeof pdf.autoTable !== 'undefined' && typeof pdf.autoTable.previous !== 'undefined') {
    currentY = pdf.autoTable.previous.finalY + 10;
    }
    
    // ===== PRICE SUMMARY SECTION =====
    const priceSectionY = currentY;
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text("Ringkasan Harga", margin, priceSectionY);
    
    // Draw a line under the section title
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, priceSectionY + 3, margin + 60, priceSectionY + 3);
    
    // Price box
    pdf.setDrawColor(240, 240, 240);
    pdf.setFillColor(250, 250, 250);
    pdf.roundedRect(margin, priceSectionY + 8, pageWidth - (margin * 2), 30, 2, 2, 'F');
    
    // Price details
    const priceStartY = priceSectionY + 15;
    const priceIndent = margin + 10;
    const priceCol2 = centerX;
    const priceCol3 = pageWidth - margin - 10;
    
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    
    // Headers
    pdf.setTextColor(100, 100, 100);
    pdf.text("Item", priceIndent, priceStartY);
    pdf.text("Jumlah", priceCol2, priceStartY);
    pdf.text("Harga", priceCol3, priceStartY, { align: "right" });
    
    // Adult price
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Dewasa`, priceIndent, priceStartY + 8);
    pdf.text(`${bookingData.pricing.adultCount}`, priceCol2, priceStartY + 8);
    pdf.text(`Rp ${bookingData.pricing.adultTotal.toLocaleString("id-ID")}`, priceCol3, priceStartY + 8, { align: "right" });
    
    // Child price
    pdf.text(`Anak`, priceIndent, priceStartY + 16);
    pdf.text(`${bookingData.pricing.childCount}`, priceCol2, priceStartY + 16);
    pdf.text(`Rp ${bookingData.pricing.childTotal.toLocaleString("id-ID")}`, priceCol3, priceStartY + 16, { align: "right" });
    
    // Taxes
    pdf.text("Pajak & Biaya", priceIndent, priceStartY + 24);
    pdf.text(`-`, priceCol2, priceStartY + 24);
    pdf.text(`Rp ${bookingData.pricing.taxes.toLocaleString("id-ID")}`, priceCol3, priceStartY + 24, { align: "right" });
    
    // Total box
    const totalBoxY = priceSectionY + 42;
    pdf.setDrawColor(8, 132, 199);
    pdf.setFillColor(240, 249, 255);
    pdf.roundedRect(centerX - 50, totalBoxY, 100, 16, 2, 2, 'F');
    
    // Total
    pdf.setFont(undefined, 'bold');
    pdf.text("TOTAL", centerX - 40, totalBoxY + 10);
    pdf.text(`Rp ${bookingData.pricing.total.toLocaleString("id-ID")}`, centerX + 40, totalBoxY + 10, { align: "right" });
    
    // ===== BOARDING PASS SECTION =====
    const boardingPassY = totalBoxY + 25;
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text("Boarding Pass", margin, boardingPassY);
    
    // Draw a line under the section title
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, boardingPassY + 3, margin + 60, boardingPassY + 3);
    
    // Draw boarding pass with dashed border
    pdf.setDrawColor(8, 132, 199);
    try {
    pdf.setLineDashPattern([3, 3], 0);
    } catch (e) {
    // Fallback for older jsPDF versions
    console.log("setLineDashPattern not supported, using solid line");
    }
    pdf.roundedRect(margin, boardingPassY + 8, pageWidth - (margin * 2), 45, 3, 3);
    try {
    pdf.setLineDashPattern([0], 0);
    } catch (e) {
    // Fallback for older jsPDF versions
    }
    
    // Boarding pass content
    const bpContentY = boardingPassY + 18;
    
    // Left column
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, 'normal');
    pdf.text("Nama Penumpang", margin + 10, bpContentY);
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text(primaryPassenger, margin + 10, bpContentY + 7);
    
    // Middle column
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, 'normal');
    pdf.text("Penerbangan", centerX - 20, bpContentY);
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text(bookingData.flightDetails.kode, centerX - 20, bpContentY + 7);
    
    // Right column
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, 'normal');
    pdf.text("Tanggal", pageWidth - margin - 10, bpContentY, { align: "right" });
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text(bookingData.flightDetails.tanggal, pageWidth - margin - 10, bpContentY + 7, { align: "right" });
    
    // Second row
    const bpRow2Y = bpContentY + 18;
    
    // From
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, 'normal');
    pdf.text("Dari", margin + 10, bpRow2Y);
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text(bookingData.flightDetails.dari, margin + 10, bpRow2Y + 7);
    
    // To
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, 'normal');
    pdf.text("Ke", centerX - 20, bpRow2Y);
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text(bookingData.flightDetails.ke, centerX - 20, bpRow2Y + 7);
    
    // Time
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, 'normal');
    pdf.text("Waktu", pageWidth - margin - 10, bpRow2Y, { align: "right" });
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text(bookingData.flightDetails.jam, pageWidth - margin - 10, bpRow2Y + 7, { align: "right" });
    
    // ===== FOOTER =====
    const footerY = pdf.internal.pageSize.getHeight() - 15;
    
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Terima kasih telah memilih HackTIX untuk perjalanan Anda.", centerX, footerY - 5, { align: "center" });
    pdf.text("Untuk bantuan, hubungi kami di support@hacktix.com atau +62 899-8021-267", centerX, footerY, { align: "center" });
    
    // Save the PDF
    pdf.save('HackTIX-E-Ticket.pdf');
    
    // Remove loading indicator
    const loadingElement = document.getElementById('pdfLoading');
    if (loadingElement) {
    loadingElement.remove();
    }
    
    // Close modal if it's open
    const modal = document.getElementById("pdfModal");
    if (modal) {
    const modalContent = modal.querySelector(".bg-white");
    if (modalContent) {
        modalContent.style.opacity = "0";
        modalContent.style.transform = "scale(0.95)";
    }
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
    }
    
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF: ' + error.message);
        
        // Remove loading indicator
        const loadingElement = document.getElementById('pdfLoading');
        if (loadingElement) {
        loadingElement.remove();
        }
    }
}