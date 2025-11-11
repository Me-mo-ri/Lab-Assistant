fetch("equipment.json")
  .then(res => res.json())
  .then(data => {
    renderGrid(document.getElementById("chemistry-grid"), data.chemistry);
    renderGrid(document.getElementById("biology-grid"), data.biology);
    renderGrid(document.getElementById("physics-grid"), data.physics);
    renderGrid(document.getElementById("earth-grid"), data.earth);
  })
  .catch(err => console.error("Error loading equipment data:", err));

const sidebarItems = document.querySelectorAll(".sidebar li");
const sections = document.querySelectorAll(".section");

sidebarItems.forEach(item => {
  item.addEventListener("click", () => {
    sidebarItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const target = item.dataset.section;
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

function renderGrid(gridElement, items) {
  gridElement.innerHTML = "";
  items.forEach(equipment => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.innerHTML = `
      <div class="image" 
           style="background-image: url(${equipment.img});
                  background-size: cover;
                  background-position: center;
                  background-repeat: no-repeat;">
      </div>
      <p class="name">${equipment.name}</p>
    `;
    gridElement.appendChild(itemDiv);

    itemDiv.addEventListener("click", () => showPopup(equipment));
  });
}

const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup-close");
const popupName = document.getElementById("popup-name");
const popupFeature = document.getElementById("popup-feature");
const popupMaterial = document.getElementById("popup-material");
const popupTag = document.getElementById("popup-tag");
const popupImage = document.getElementById("popup-image");
const popupIframe = document.getElementById("popup-iframe");

function showPopup(item) {
  popupName.textContent = item.name || "";
  popupFeature.textContent = item.feature ? `특징: ${item.feature}` : "";
  popupMaterial.textContent = item.material ? `재질: ${item.material}` : "";
  popupTag.textContent = item.tags ? `태그: ${item.tags.join(", ")}` : (item.tag || "");

  popupImage.style.backgroundImage = `url(${item.img || 'img/default.png'})`;

  if (item.video) {
    popupIframe.src = item.video;
  } else {
    popupIframe.src = "";
  }

  popup.style.display = "flex";
}

popupClose.addEventListener("click", () => {
  popupIframe.src = "";
  popup.style.display = "none";
});

popup.addEventListener("click", e => {
  if (e.target === popup) {
    popupIframe.src = "";
    popup.style.display = "none";
  }
});