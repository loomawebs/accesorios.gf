/**
 * DATA DE PRODUCTOS - G&F SHOWCASE v3.0
 */
const PRODUCTS = [
  {
    id: "p1",
    title: "Airpods Pro 2da Gen",
    cat: "TRUE WIRELESS",
    price: 59990, // Precio actual
    oldPrice: 69990, // Número para cálculos o formato
    inStock: true,
    video: "./airpods.mp4", // Video de producto (opcional)
    description:
      "Los Airpods Pro 2da Gen son auriculares inalámbricos con cancelación activa de ruido, resistencia al agua IPX4 y hasta 6 horas de reproducción.",
    images: [
      "./images/products/Air Pods Pro 2da Gen/product(1).png",
      "./images/products/Air Pods Pro 2da Gen/product(2).png",
      "./images/products/Air Pods Pro 2da Gen/product(3).png",
      "./images/products/Air Pods Pro 2da Gen/product(4).png",
      "./images/products/Air Pods Pro 2da Gen/product(5).png",
      "./images/products/Air Pods Pro 2da Gen/product(6).png",
      "./images/products/Air Pods Pro 2da Gen/product(7).png",
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
    oldPrice: 29990,
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
    oldPrice: 24990,
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
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(Math.trunc(num));
    },

    open(id) {
        this.activeProd = PRODUCTS.find((p) => p.id === id);

        // Textos básicos
        document.getElementById("v-title").innerText = this.activeProd.title;
        document.getElementById("v-cat").innerText = this.activeProd.cat;
        document.getElementById("v-desc").innerText = this.activeProd.description;

        // Precios y Stock
        const priceEl = document.getElementById("v-price");
        const badgeEl = document.getElementById("v-stock-badge");
        const btnEl = document.getElementById("v-whatsapp-btn");
        const btnText = document.getElementById("v-btn-text");

        priceEl.innerHTML = this.activeProd.oldPrice 
            ? `<span class="old-price">${this.formatCurrency(this.activeProd.oldPrice)}</span> ${this.formatCurrency(this.activeProd.price)}`
            : this.formatCurrency(this.activeProd.price);

        if (this.activeProd.inStock) {
            badgeEl.innerText = "STOCK DISPONIBLE";
            badgeEl.className = "stock-badge in-stock";
            btnEl.classList.remove("disabled");
            btnText.innerText = "CONSULTAR POR WHATSAPP";
            btnEl.href = `https://wa.me/5492645643805?text=Hola! Me interesa el producto: ${this.activeProd.title}`;
        } else {
            badgeEl.innerText = "PRODUCTO AGOTADO";
            badgeEl.className = "stock-badge out-of-stock";
            btnEl.classList.add("disabled");
            btnText.innerText = "SIN STOCK TEMPORALMENTE";
        }

        // --- GESTIÓN DE GALERÍA (Imágenes + Video) ---
        const thumbStrip = document.getElementById("thumbStrip");
        
        // 1. Mostrar la primera imagen por defecto
        this.changeMedia(this.activeProd.images[0], 'image');

        // 2. Generar miniaturas de imágenes
        let thumbsHTML = this.activeProd.images.map((img, index) => `
            <div class="thumb ${index === 0 ? "active" : ""}" onclick="viewer.changeMedia('${img}', 'image', this)">
                <img src="${img}" alt="Vista ${index + 1}">
            </div>
        `).join("");

        // 3. Agregar miniatura de video si existe
        if (this.activeProd.video) {
            thumbsHTML += `
                <div class="thumb thumb-video" onclick="viewer.changeMedia('${this.activeProd.video}', 'video', this)">
                    <div class="video-overlay"><i data-lucide="play"></i></div>
                    <video src="${this.activeProd.video}" muted></video>
                </div>
            `;
        }
        thumbStrip.innerHTML = thumbsHTML;

        // Specs
        const specContent = document.getElementById("specContent");
        specContent.innerHTML = Object.entries(this.activeProd.specs)
            .map(([key, value]) => `<div class="spec-line"><span>${key}</span><strong>${value}</strong></div>`)
            .join("");

        this.modal.classList.add("active");
        document.body.style.overflow = "hidden";
        lucide.createIcons();
    },

    // FUNCIÓN CLAVE: Cambia entre Video e Imagen
    changeMedia(src, type, thumbEl) {
        const display = document.querySelector(".main-display");
        
        if (type === 'video') {
            display.innerHTML = `<video src="${src}" controls autoplay loop class="fade-in"></video>`;
        } else {
            display.innerHTML = `<img src="${src}" alt="Producto" class="fade-in">`;
        }

        if (thumbEl) {
            document.querySelectorAll(".thumb").forEach((t) => t.classList.remove("active"));
            thumbEl.classList.add("active");
        }
    },

    close() {
        this.modal.classList.remove("active");
        document.body.style.overflow = "auto";
        // Limpiamos el display para que el video deje de sonar/reproducirse
        document.querySelector(".main-display").innerHTML = "";
    },

    toggleSpecs() {
        document.getElementById("specContent").classList.toggle("active");
        const icon = document.getElementById("specIcon");
        // Cambiar icono de plus a minus (opcional)
    }
};

// Renderizado inicial (igual al tuyo)
function renderCatalog() {
    const root = document.getElementById("catalog-root");
    if(!root) return;

    root.innerHTML = PRODUCTS.map((p) => {
        // Lógica para el display de precios (Normal vs Oferta)
        const priceHTML = p.oldPrice && p.inStock
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
                    <p class="p-price">${priceHTML}</p>
                </div>
            </div>
        `;
    }).join("");
    
    lucide.createIcons();
}
document.addEventListener("DOMContentLoaded", renderCatalog);