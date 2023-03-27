const form = document.getElementById("form-cari");
const hasil = document.getElementById("hasil");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nomorSurah = this.querySelector('input[name="nomor_surah"]').value;
  const ayatAwal = this.querySelector('input[name="ayat_awal"]').value;
  const ayatAkhir = this.querySelector('input[name="ayat_akhir"]').value;

  fetch(`https://api.alquran.cloud/v1/ayah/${nomorSurah}:${ayatAwal}-${ayatAkhir}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if(Array.isArray(data)) {
      let html = "";

      data.forEach(function(ayah) {
        html += `<p><strong>${ayah.ayah}</strong> (${ayah.surah.name} ${ayah.surah.number}:${ayah.numberInSurah}) - ${ayah.text}</p>`;
      });

      hasil.innerHTML = html;
    } else {
      hasil.innerHTML = "Data yang ditemukan tidak valid";
    }
  })
  .catch(function(error) {
    hasil.innerHTML = "Terjadi kesalahan dalam mengambil data dari server";
  });
});
