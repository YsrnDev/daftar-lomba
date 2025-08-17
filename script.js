// Ganti URL ini dengan URL Google Apps Script Anda
const googleSheetURL = "https://script.google.com/macros/s/AKfycbxRAiYhugRbBePHaIXMCv9wbo_GR8LBzbHXoXCy9upbjNeOZO4xQJLr1QzFga2Efp3WEA/exec"; 

const form = document.getElementById("registrationForm");
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModalBtn");

function handleResponse(response) {
    if (response.result === "success") {
        modalOverlay.style.display = "flex";
        form.reset();
    } else {
        alert("Gagal mendaftar. Silakan coba lagi.");
    }
    const submitBtn = document.querySelector('.btn');
    submitBtn.textContent = "Daftar Sekarang";
    submitBtn.disabled = false;
}

form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    const submitBtn = document.querySelector('.btn');
    submitBtn.textContent = "Mengirim...";
    submitBtn.disabled = true;

    const urlEncodedData = new URLSearchParams(formObject).toString();
    
    // Menambahkan parameter unik pada URL untuk mencegah duplikasi
    const uniqueURL = `${googleSheetURL}?callback=handleResponse&${urlEncodedData}&_t=${Date.now()}`;

    const script = document.createElement('script');
    script.src = uniqueURL;
    document.body.appendChild(script);

    script.onload = () => {
        document.body.removeChild(script);
    };

    script.onerror = () => {
        document.body.removeChild(script);
        alert("Terjadi kesalahan. Cek koneksi internet Anda.");
        submitBtn.textContent = "Daftar Sekarang";
        submitBtn.disabled = false;
    };
});

closeModalBtn.addEventListener("click", function() {
    modalOverlay.style.display = "none";
});

const d = new Date();
let year = d.getUTCFullYear();
document.getElementById("yearsNow").innerHTML = year;