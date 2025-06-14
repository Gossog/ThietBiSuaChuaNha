document.addEventListener("DOMContentLoaded", function () {
  // Giả lập dữ liệu sản phẩm
  const featuredProducts = [
    {
      id: 1,
      name: "Bộ dụng cụ đa năng 32 chi tiết",
      price: 350000,
      image: "img/DaNang32ChiTiet.jpg",
      category: "tools",
    },
    {
      id: 2,
      name: "Máy khoan động lực Bosch",
      price: 1250000,
      image: "img/KhoanBosch.jpg",
      category: "power-tools",
    },
    {
      id: 3,
      name: "Bình xịt sơn cao cấp",
      price: 280000,
      image: "img/BinhXitSon.jpg",
      category: "paint",
    },
    {
      id: 4,
      name: "Bộ cờ lê đầu miệng",
      price: 420000,
      image: "img/CoLeDauMieng.jpg",
      category: "tools",
    },
  ];

  const productsContainer = document.getElementById("featured-products");

  if (productsContainer) {
    featuredProducts.forEach((product) => {
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

    // Gắn sự kiện cho nút Thêm vào giỏ
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
          alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng.");
          return;
        }

        const productId = parseInt(this.dataset.id);
        const product = featuredProducts.find((p) => p.id === productId);

        if (!product) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find((item) => item.id === productId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
      });
    });
  }

  // Kiểm tra trạng thái đăng nhập
  checkLoginStatus();
});

function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const logoutLink = document.getElementById("logoutLink");

  if (user) {
    if (loginLink) {
      loginLink.textContent = user.name;
      loginLink.href = "profile.html";
    }
    if (registerLink) registerLink.style.display = "none";
    if (logoutLink) {
      logoutLink.style.display = "inline";
      logoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        handleLogout();
      });
    }
  } else {
    if (loginLink) {
      loginLink.textContent = "Đăng nhập";
      loginLink.href = "login.html";
    }
    if (registerLink) {
      registerLink.textContent = "Đăng ký";
      registerLink.href = "register.html";
      registerLink.style.display = "inline";
    }
    if (logoutLink) logoutLink.style.display = "none";
  }
}

function handleLogout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
