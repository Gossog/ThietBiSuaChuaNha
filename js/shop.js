document.addEventListener("DOMContentLoaded", function () {
  // Dữ liệu sản phẩm
  const products = [
    {
      id: 1,
      name: "Bộ dụng cụ đa năng 32 chi tiết",
      price: 350000,
      image: "../img/DaNang32ChiTiet.jpg",
      category: "tools",
      description: "Bộ dụng cụ đa năng với 32 chi tiết, chất liệu thép cao cấp",
    },
    {
      id: 2,
      name: "Máy khoan động lực Bosch",
      price: 1250000,
      image: "../img/KhoanBosch.jpg",
      category: "power-tools",
      description: "Máy khoan động lực Bosch công suất 650W, mạnh mẽ và bền bỉ",
    },
    {
      id: 3,
      name: "Bình xịt sơn cao cấp",
      price: 280000,
      image: "../img/BinhXitSon.jpg",
      category: "paint",
      description: "Bình xịt sơn cao cấp, dung tích 1 lít, dễ sử dụng",
    },
    {
      id: 4,
      name: "Bộ cờ lê đầu miệng",
      price: 420000,
      image: "../img/CoLeDauMieng.jpg",
      category: "tools",
      description: "Bộ cờ lê đầu miệng 10 chiếc, chất liệu thép hợp kim",
    },
    {
      id: 5,
      name: "Máy cắt gạch men",
      price: 1850000,
      image: "../img/MayCatGachMen.jpg",
      category: "power-tools",
      description: "Máy cắt gạch men công suất 800W, cắt chính xác",
    },
    {
      id: 6,
      name: "Van nước 1 chiều",
      price: 75000,
      image: "../img/Van1Chieu.jpg",
      category: "plumbing",
      description: "Van nước 1 chiều inox, kích thước 21mm",
    },
    {
      id: 7,
      name: "Ổ cắm điện âm tường",
      price: 45000,
      image: "../img/OCam.jpg",
      category: "electrical",
      description: "Ổ cắm điện âm tường 2 lỗ, chất liệu nhựa chống cháy",
    },
    {
      id: 8,
      name: "Sơn lót chống kiềm",
      price: 320000,
      image: "../img/SonLotChongKiem.jpg",
      category: "paint",
      description: "Sơn lót chống kiềm, thùng 5 lít, độ phủ 8-10m²/lít",
    },
  ];

  const productsContainer = document.getElementById("productsContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  // Hiển thị sản phẩm
  function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = "";

    if (productsToDisplay.length === 0) {
      productsContainer.innerHTML =
        '<p class="no-products">Không tìm thấy sản phẩm phù hợp</p>';
      return;
    }

    productsToDisplay.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product-card";
      productElement.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-price">${product.price.toLocaleString()}đ</p>
          <button class="btn add-to-cart" data-id="${
            product.id
          }">Thêm vào giỏ</button>
        </div>
      `;
      productsContainer.appendChild(productElement);
    });

    // Sự kiện thêm vào giỏ
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        addToCart(productId);
      });
    });
  }

  // Lọc sản phẩm
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    let filtered = products;

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
      );
    }

    displayProducts(filtered);
  }

  // Thêm vào giỏ hàng
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  }

  // Đăng ký sự kiện tìm kiếm và lọc
  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  // Hiển thị ban đầu
  displayProducts(products);
});
