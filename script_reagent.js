fetch('reagent.json')
  .then(response => response.json())
  .then(data => {
    for (const section in data) {
      renderGrid(`grid-${section}`, data[section]);
    }
  })
  .catch(err => console.error('Error loading reagent data:', err));

function renderGrid(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'image';
    imgDiv.style.backgroundImage = `url(${item.img})`;

    const nameP = document.createElement('p');
    nameP.className = 'name';
    nameP.textContent = item.name;

    div.appendChild(imgDiv);
    div.appendChild(nameP);

    container.appendChild(div);
  });
}