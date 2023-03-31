const form = document.getElementById("form-cari");
const hasil = document.getElementById("hasil");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nomorSurah = this.querySelector('input[name="nomor_surah"]').value;
  const ayatAwal = this.querySelector('input[name="ayat_awal"]').value;
  const ayatAkhir = this.querySelector('input[name="ayat_akhir"]').value;

  fetch(`https://api.alquran.cloud/v1/ayah/${nomorSurah}:${ayatAwal}-${ayatAkhir}`)
  .then(function(response) {
    //console.log// 
    (response.json());
  })
  .then(function(data) {
    
      let html = "";

      data.forEach(function(ayah) {
        html += `<p><strong>${ayah.ayah}</strong> (${ayah.surah.englishName} ${ayah.surah.number}:${ayah.numberInSurah}) - ${ayah.text}</p>`;
      });

      hasil.innerHTML = html;
   
  })
  .then(data => {
    if (data.code === 200) {
      console.log(data.data.surah.englishName);
    } else {
      console.log(`Error: ${data.code} - ${data.message}`);
    }
  })
  .catch(error => console.log(`Error: ${error}`));
})
