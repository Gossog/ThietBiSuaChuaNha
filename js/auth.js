document.addEventListener("DOMContentLoaded", function () {
  // Các phần tử form
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    const regName = document.getElementById("regName");
    const regEmail = document.getElementById("regEmail");
    const regPassword = document.getElementById("regPassword");
    const regConfirmPassword = document.getElementById("regConfirmPassword");
    const regPhone = document.getElementById("regPhone");

    const errorName = document.getElementById("errorName");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorConfirmPassword = document.getElementById(
      "errorConfirmPassword"
    );
    const errorPhone = document.getElementById("errorPhone");

    // Hàm kiểm tra định dạng email
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Hàm kiểm tra mật khẩu (ít nhất 6 ký tự, có chữ và số)
    function isValidPassword(password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      return passwordRegex.test(password);
    }

    // Hàm kiểm tra số điện thoại Việt Nam
    function isValidPhone(phone) {
      const phoneRegex = /^0\d{9}$/;
      return phoneRegex.test(phone);
    }

    // --- Sự kiện blur để hiển thị lỗi tức thì ---
    regName.addEventListener("blur", function () {
      if (regName.value.trim().length < 5) {
        errorName.textContent = "Tên phải có ít nhất 5 ký tự.";
      } else {
        errorName.textContent = "";
      }
    });

    regEmail.addEventListener("blur", function () {
      if (!isValidEmail(regEmail.value.trim())) {
        errorEmail.textContent = "Email không đúng định dạng.";
      } else {
        errorEmail.textContent = "";
      }
    });

    regPassword.addEventListener("blur", function () {
      if (!isValidPassword(regPassword.value.trim())) {
        errorPassword.textContent =
          "Mật khẩu phải ≥ 6 ký tự, gồm cả chữ và số.";
      } else {
        errorPassword.textContent = "";
      }
    });

    regConfirmPassword.addEventListener("blur", function () {
      if (regConfirmPassword.value !== regPassword.value) {
        errorConfirmPassword.textContent = "Mật khẩu xác nhận không khớp.";
      } else {
        errorConfirmPassword.textContent = "";
      }
    });

    regPhone.addEventListener("blur", function () {
      if (!isValidPhone(regPhone.value.trim())) {
        errorPhone.textContent =
          "Số điện thoại phải bắt đầu bằng 0 và đủ 10 số.";
      } else {
        errorPhone.textContent = "";
      }
    });

    // --- Xử lý submit form đăng ký ---
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Lấy giá trị
      const name = regName.value.trim();
      const email = regEmail.value.trim();
      const password = regPassword.value.trim();
      const confirmPassword = regConfirmPassword.value.trim();
      const phone = regPhone.value.trim();
      const address = document.getElementById("regAddress").value.trim();

      let valid = true;

      // Kiểm tra lại toàn bộ để chắc chắn không bỏ sót
      if (name.length < 5) {
        errorName.textContent = "Tên phải có ít nhất 5 ký tự.";
        valid = false;
      }

      if (!isValidEmail(email)) {
        errorEmail.textContent = "Email không đúng định dạng.";
        valid = false;
      }

      if (!isValidPassword(password)) {
        errorPassword.textContent =
          "Mật khẩu phải ≥ 6 ký tự, gồm cả chữ và số.";
        valid = false;
      }

      if (confirmPassword !== password) {
        errorConfirmPassword.textContent = "Mật khẩu xác nhận không khớp.";
        valid = false;
      }

      if (!isValidPhone(phone)) {
        errorPhone.textContent =
          "Số điện thoại phải bắt đầu bằng 0 và đủ 10 số.";
        valid = false;
      }

      if (!valid) return;

      // Kiểm tra email đã tồn tại
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some((u) => u.email === email)) {
        alert("Email đã được sử dụng!");
        return;
      }

      // Lưu user mới
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        phone,
        address,
        avatar: "images/avatar-placeholder.png",
        addresses: [],
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      alert("Đăng ký thành công! Bạn đã được đăng nhập tự động.");
      window.location.href = "../index.html";
    });
  }

  // --- Đăng nhập ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        window.location.href = "../index.html";
      } else {
        alert("Email hoặc mật khẩu không đúng!");
      }
    });
  }

  // --- Kiểm tra trạng thái đăng nhập ---
  checkLoginStatus();
});

// --- Cập nhật navbar khi đã đăng nhập ---
function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const loginLink = document.querySelector(
    'nav ul li a[href="html/login.html"]'
  );
  const registerLink = document.querySelector(
    'nav ul li a[href="html/register.html"]'
  );

  if (user) {
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) {
      registerLink.textContent = "Đăng xuất";
      registerLink.href = "#";
      registerLink.addEventListener("click", function (e) {
        e.preventDefault();
        handleLogout();
      });
    }
  } else {
    if (loginLink) loginLink.style.display = "inline";
    if (registerLink) registerLink.style.display = "inline";
  }
}

// --- Xử lý đăng xuất ---
function handleLogout() {
  const customConfirm = document.getElementById("customConfirm");
  const confirmCancel = document.querySelector(".confirm-btn-cancel");
  const confirmOk = document.querySelector(".confirm-btn-ok");

  if (!customConfirm || !confirmCancel || !confirmOk) {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      localStorage.removeItem("currentUser");
      window.location.reload();
    }
    return;
  }

  customConfirm.style.display = "flex";

  confirmCancel.onclick = () => {
    customConfirm.style.display = "none";
  };

  confirmOk.onclick = () => {
    localStorage.removeItem("currentUser");
    customConfirm.style.display = "none";
    window.location.reload();
  };

  customConfirm.onclick = (e) => {
    if (e.target === customConfirm) {
      customConfirm.style.display = "none";
    }
  };
}
