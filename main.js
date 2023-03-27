const form = document.querySelector('form');
const hasil = document.querySelector('#hasil');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const surah = form.elements.surah.value;
  const awal = form.elements.awal.value;
  const akhir = form.elements.akhir.value;

  const response = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${awal}-${akhir}`);
  const data = await response.json();
  console.log(data);
  
  let html = '';
  data.forEach(ayah => {
    html += `<p>${ayah.text}</p>`;
  });

  hasil.innerHTML = html;
});