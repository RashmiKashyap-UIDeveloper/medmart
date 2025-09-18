//Products Data
const products = [
  { id: 1, name: "Surgical Hand Gloves", price: 49.5, category: "popular", img: "assets/products/product-1.webp", tag: [] },
  { id: 2, name: "Clinical Stethoscope", price: 29.9, category: "popular", img: "assets/products/product-2.webp", tag: [] },
  { id: 3, name: "Digital Thermometer", price: 15.0, category: "popular", img: "assets/products/product-3.webp", tag: ["20% Off"] },
  { id: 4, name: "Digital Thermometer", price: 9.99, category: "popular", img: "assets/products/product-4.webp", tag: [] },
  { id: 5, name: "Digital Thermometer", price: 12.5, category: "popular", img: "assets/products/product-3.webp", tag: ["20% Off"] },
  { id: 6, name: "First Medicine Aid Kit", price: 7.0, category: "popular", img: "assets/products/product-6.webp", tag: [] },
  { id: 7, name: "Pills Bottle", price: 5.5, category: "popular", img: "assets/products/product-7.webp", tag: ["On Sale"] },
  { id: 8, name: "Surgical Face Mask", price: 8.75, category: "popular", img: "assets/products/product-8.webp", tag: [] },
  { id: 9, name: "Oximeter", price: 39.9, category: "popular", img: "assets/products/product-1.webp", tag: [] },
  { id: 10, name: "First Aid Kit", price: 59.0, category: "popular", img: "assets/products/product-2.webp", tag: [] },
  { id: 11, name: "Heating Pad", price: 35.5, category: "popular", img: "assets/products/product-3.webp", tag: [] },
  { id: 12, name: "Pulse Monitor", price: 45.0, category: "popular", img: "assets/products/product-4.webp", tag: [] },
  { id: 13, name: "Surgical Hand Gloves", price: 49.5, category: "top-rated", img: "assets/products/product-1.webp", tag: [] },
  { id: 14, name: "Clinical Stethoscope", price: 29.9, category: "top-rated", img: "assets/products/product-2.webp", tag: [] },
  { id: 15, name: "Digital Thermometer", price: 15.0, category: "top-rated", img: "assets/products/product-3.webp", tag: [] },
  { id: 16, name: "Clinical Stethoscope", price: 29.9, category: "top-rated", img: "assets/products/product-2.webp", tag: [] },
  { id: 17, name: "First Medicine Aid Kit", price: 7.0, category: "trending", img: "assets/products/product-6.webp", tag: [] },
  { id: 18, name: "Pills Bottle", price: 5.5, category: "trending", img: "assets/products/product-7.webp", tag: [] },
  { id: 19, name: "Surgical Face Mask", price: 8.75, category: "trending", img: "assets/products/product-8.webp", tag: [] },
  { id: 20, name: "Digital Thermometer", price: 15.0, category: "trending", img: "assets/products/product-3.webp", tag: [] },
];


let currentCategory = "popular";
let visibleCount = 8; // show first 8

function renderProducts(category) {
  let containerId = category === "popular" ? "popular-list" :
    category === "top-rated" ? "top-list" : "trending-list";
  const container = document.getElementById(containerId);

  container.innerHTML = "";

  const filtered = products.filter(p => p.category === category);
  const visibleProducts = filtered.slice(0, visibleCount);

  visibleProducts.forEach(p => {
    const tags = Array.isArray(p.tag) ? p.tag : (p.tag ? [p.tag] : []);

    const tagsHtml = tags.map(tag => {
      let tagClass = "";
      if (tag.toLowerCase().includes("sale")) {
        tagClass = "tag-sale"; // red
      } else if (tag.toLowerCase().includes("20% off")) {
        tagClass = "tag-off"; // primary
      } else {
        tagClass = "tag-default"; // fallback style
      }
      return `<span class="tag ${tagClass}">${tag}</span>`;
    }).join("");

    container.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="product-card card h-100 bg-light-gray border-0 rounded-0 position-relative">
        <div class="tags position-absolute">${tagsHtml}</div>
        <img src="${p.img}" class="card-img-top" alt="${p.name}" loading="lazy">
        <div class="card-footer p-4 flex-grow-1">
          <h3>${p.name}</h3>
          <p class="price">$${p.price}</p>
        </div>
      </div>
    </div>`;
  });

  // toggle button visibility
  document.getElementById("loadMoreBtn").style.display =
    visibleCount < filtered.length ? "block" : "none";
}

// Handle tab click
document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
  tab.addEventListener("shown.bs.tab", function (e) {
    currentCategory = e.target.getAttribute("data-bs-target").replace("#", "");
    currentCategory = currentCategory === "popular-items" ? "popular" :
      currentCategory === "top-rated" ? "top-rated" : "trending";

    visibleCount = 8;
    renderProducts(currentCategory);
  });
});

// Load more button
document.getElementById("loadMoreBtn").addEventListener("click", function () {
  const loader = document.getElementById("loader");

  // Show loader immediately
  loader.style.display = "block";

  // Hide the button while loading
  this.style.display = "none";

  // Simulate loading delay
  setTimeout(() => {
    visibleCount += 4; // load 4 more items
    renderProducts(currentCategory);

    // Hide loader after content is loaded
    loader.style.display = "none";
  }, 1000); // 1 second delay
});

// Initial render
renderProducts(currentCategory);
