/**
 * DATA DE PRODUCTOS - G&F SHOWCASE v3.0
 */
const PRODUCTS = [
  {
    id: "p1",
    title: "Airpods Pro 2da Gen",
    cat: "TRUE WIRELESS",
    price: 29990, // Precio actual
    oldPrice: 59990, // Número para cálculos o formato
    inStock: true,
    description:
      "Los Airpods Pro 2da Gen son auriculares inalámbricos con cancelación activa de ruido, resistencia al agua IPX4 y hasta 6 horas de reproducción.",
    images: [
      "./images/products/Air Pods Pro 2da Gen/product(1).png",
      "./images/products/Air Pods Pro 2da Gen/product(2).png",
      "./images/products/Air Pods Pro 2da Gen/product(3).png",
      "./images/products/Air Pods Pro 2da Gen/product(4).png",
      "./images/products/Air Pods Pro 2da Gen/product(5).png",
      "./images/products/Air Pods Pro 2da Gen/product(6).png",
    ],
    specs: {
      Driver: "10mm Dinámico",
      Frecuencia: "20Hz - 20kHz",
      Sensibilidad: "110 dB SPL/mW",
      Peso: "250g",
      Construcción: "Aluminio & Cuero",
    },
  },
  {
    id: "p2",
    title: "Air Pro Buds 2da Gen",
    cat: "REFERENCE MONITOR",
    price: 24990,
    inStock: false, // PRODUCTO AGOTADO
    description:
      "Los Air Pro Buds 2da Gen son auriculares de referencia con un driver de 40mm y una construcción de aluminio y cuero.",
    images: [
      "./images/products/Air Pro Buds 2da Gen/Air Pro 2da Gen (1).jpeg",
      "./images/products/Air Pro Buds 2da Gen/Air Pro 2da Gen (9).jpeg",
      "./images/products/Air Pro Buds 2da Gen/Air Pro 2da Gen (8).jpeg",
      "./images/products/Air Pro Buds 2da Gen/Air Pro 2da Gen (7).jpeg",
      "./images/products/Air Pro Buds 2da Gen/Air Pro 2da Gen (6).jpeg",
      "./images/products/Air Pro Buds 2da Gen/Air Pro 2da Gen (5).jpeg",
      "./images/products/Air Pro Buds 2da Gen/Air Pro 2da Gen (4).jpeg",
      "./images/products/Air Pro Buds 2da Gen/Air Pro 2da Gen (3).jpeg",
      "./images/products/Air Pro Buds 2da Gen/Air Pro 2da Gen (2).jpeg",
    ],
    specs: {
      Drivers: "40mm Dinámico",
      Crossover: "3 vías",
      Aislamiento: "-26 dB",
      Cable: "1.2m Trenzado",
      Conector: "3.5mm Chapado en Oro",
    },
  },
  {
    id: "p3",
    title: "TWS 300",
    cat: "REFERENCE MONITOR",
    price: 19990,
    inStock: false,
    description:
      "Los TWS 300 son auriculares true wireless con Bluetooth 5.2, latencia ultra baja de 40ms y batería de hasta 8 horas.",
    images: [
      "./images/products/TWS 300/TWS 300 (1).jpeg",
      "./images/products/TWS 300/TWS 300 (12).jpeg",
      "./images/products/TWS 300/TWS 300 (11).jpeg",
      "./images/products/TWS 300/TWS 300 (10).jpeg",
      "./images/products/TWS 300/TWS 300 (9).jpeg",
      "./images/products/TWS 300/TWS 300 (8).jpeg",
      "./images/products/TWS 300/TWS 300 (7).jpeg",
      "./images/products/TWS 300/TWS 300 (6).jpeg",
      "./images/products/TWS 300/TWS 300 (5).jpeg",
      "./images/products/TWS 300/TWS 300 (4).jpeg",
      "./images/products/TWS 300/TWS 300 (3).jpeg",
      "./images/products/TWS 300/TWS 300 (2).jpeg",
    ],
    specs: {
      Conexión: "Bluetooth 5.2",
      Latencia: "40ms",
      Batería: "Hasta 8 horas",
      Mic: "Patrón Cardioide",
      Espacial: "Dolby Atmos Support",
    },
  },
];

const viewer = {
  modal: document.getElementById("productViewer"),
  activeProd: null,

  formatCurrency(num) {
    if (!num) return "";
    const truncated = Math.trunc(num * 100) / 100;
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(truncated);
  },

  open(id) {
    this.activeProd = PRODUCTS.find((p) => p.id === id);

    document.getElementById("v-title").innerText = this.activeProd.title;
    document.getElementById("v-cat").innerText = this.activeProd.cat;
    document.getElementById("v-desc").innerText = this.activeProd.description;

    // Manejo de Precio con Descuento en el Modal
    const priceEl = document.getElementById("v-price");
    let priceHTML = ``;

    if (this.activeProd.oldPrice) {
      priceHTML += `<span class="old-price">${this.formatCurrency(this.activeProd.oldPrice)}</span> `;
    }
    priceHTML += `<span class="current-price">${this.formatCurrency(this.activeProd.price)}</span>`;
    priceEl.innerHTML = priceHTML;

    // 2. Precio y Stock
    const badgeEl = document.getElementById("v-stock-badge");
    const btnEl = document.getElementById("v-whatsapp-btn");
    const btnText = document.getElementById("v-btn-text");

    priceEl.innerText = this.formatCurrency(this.activeProd.price);

    if (this.activeProd.inStock) {
      badgeEl.innerText = "STOCK DISPONIBLE";
      badgeEl.className = "stock-badge in-stock";
      btnEl.classList.remove("disabled");
      btnText.innerText = "CONSULTAR POR WHATSAPP";

      // Configuración para abrir en pestaña nueva
      btnEl.href = `https://wa.me/5492645643805?text=Hola! Me interesa el producto: ${this.activeProd.title}`;
      btnEl.target = "_blank";
      btnEl.rel = "noopener noreferrer";
    } else {
      badgeEl.innerText = "PRODUCTO AGOTADO";
      badgeEl.className = "stock-badge out-of-stock";
      btnEl.classList.add("disabled");
      btnText.innerText = "SIN STOCK TEMPORALMENTE";
      btnEl.href = "#";

      // Opcional: resetear el target si está agotado
      btnEl.removeAttribute("target");
    }
    // 3. Galería de Imágenes
    const mainImg = document.getElementById("activeImg");
    mainImg.src = this.activeProd.images[0];

    const thumbStrip = document.getElementById("thumbStrip");
    thumbStrip.innerHTML = this.activeProd.images
      .map(
        (img, index) => `
            <div class="thumb ${index === 0 ? "active" : ""}" onclick="viewer.changeImg('${img}', this)">
                <img src="${img}" alt="Vista ${index + 1}">
            </div>
        `,
      )
      .join("");

    // 4. Specs
    const specContent = document.getElementById("specContent");
    specContent.innerHTML = Object.entries(this.activeProd.specs)
      .map(
        ([key, value]) => `
            <div class="spec-line">
                <span>${key}</span>
                <strong>${value}</strong>
            </div>
        `,
      )
      .join("");

    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
    lucide.createIcons();
  },

  close() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "auto";
  },

  changeImg(src, thumbEl) {
    document.getElementById("activeImg").src = src;
    document
      .querySelectorAll(".thumb")
      .forEach((t) => t.classList.remove("active"));
    thumbEl.classList.add("active");
  },

  toggleSpecs() {
    const content = document.getElementById("specContent");
    content.classList.toggle("active");
  },
};

function renderCatalog() {
  const root = document.getElementById("catalog-root");
  root.innerHTML = PRODUCTS.map((p) => {
    // Lógica de precio para la tarjeta
    const priceDisplay = p.oldPrice
      ? `<span class="old-price">${viewer.formatCurrency(p.oldPrice)}</span> ${viewer.formatCurrency(p.price)}`
      : viewer.formatCurrency(p.price);

    return `
            <div class="product-card ${!p.inStock ? "card-out-of-stock" : ""}" onclick="viewer.open('${p.id}')">
                <div class="p-media">
                    <img src="${p.images[0]}" alt="${p.title}">
                    ${p.oldPrice && p.inStock ? '<div class="offer-tag">OFERTA</div>' : ""}
                    ${!p.inStock ? '<div class="sold-out-overlay">AGOTADO</div>' : ""}
                </div>
                <div class="p-meta">
                    <span class="p-cat">${p.cat}</span>
                    <h3 class="p-title">${p.title}</h3>
                    <p class="p-price">${priceDisplay}</p>
                </div>
            </div>
        `;
  }).join("");
  lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", renderCatalog);
