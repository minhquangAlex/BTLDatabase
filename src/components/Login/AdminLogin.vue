<template>
    <div class="container">
      <div class="card">
        <div class="header">
          <h2>ĐĂNG NHẬP</h2>
        </div>
  
        <div class="content">
          <!-- Form đăng nhập -->
          <div class="form-container">
            <h3>Nhập thông tin tài khoản của bạn</h3>
            <form @submit.prevent="handleSubmit">
              <label for="username">Tên đăng nhập</label>
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="Tên đăng nhập"
              />
              <label for="password">Mật khẩu</label>
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Mật khẩu"
              />
              <div class="forgot-password">
                <a href="#">Quên mật khẩu?</a>
              </div>
              <div class="actions" >
                <router-link to="/login/admin-page" class = "Login-button">
                  Đăng nhập
                </router-link>
              </div>
            </form>
          </div>
  
          <!-- Ghi chú và hỗ trợ kỹ thuật -->
          <div class="note">
            <h3>Lưu ý</h3>
            <p>
              Đây là trang đăng nhập tài khoản dành riêng cho quản trị viên hệ
              thống, sinh viên vui lòng không đăng nhập vào đây.
            </p>
            <h3>Hỗ trợ kỹ thuật</h3>
            <p>Email: support@hcmut.edu.vn</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminLogin",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      handleSubmit() {
        if (!this.username || !this.password) {
          alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
          return;
        }
        if (this.username === "admin" && this.password === "admin123") {
          alert("Đăng nhập thành công!");
        } else {
          alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tổng quan */


  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb; /* Tailwind bg-gray-50 */
  }
  
  .card {
    width: 100%;
    max-width: 1024px;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #d1d5db;
  }
  
  /* Header */
  .header h2 {
    font-size: 1.25rem; /* Tailwind text-xl */
    font-weight: 700; /* Tailwind font-bold */
    color: #1d4ed8; /* Tailwind text-blue-700 */
    margin-bottom: 1.5rem;
  }
  
  /* Content */
  .content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media (min-width: 768px) {
    .content {
      grid-template-columns: 1fr 1fr; /* Tailwind md:grid-cols-2 */
    }
  }
  
  /* Form container */
  .Login-button {
    padding: 12px 15px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #4f76f5;
    background-color: #fff;
    cursor: pointer;
    width: 30%;
    text-align: center;
    transition: all 0.3s ease;
  }
  .form-container {
    padding: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: #f3f4f6; /* Tailwind bg-gray-100 */
  }
  
  .form-container h3 {
    font-size: 1.125rem; /* Tailwind text-lg */
    font-weight: 700; /* Tailwind font-bold */
    color: #b91c1c; /* Tailwind text-red-700 */
    margin-bottom: 1rem;
  }
  
  .form-container label {
    display: block;
    font-size: 0.875rem; /* Tailwind text-sm */
    font-weight: 500; /* Tailwind font-medium */
    color: #374151; /* Tailwind text-gray-700 */
    margin-bottom: 0.5rem;
  }
  
  .form-container input {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    color: #000;
  }
  
  /* Forgot password link */
  .forgot-password a {
    font-size: 0.875rem; /* Tailwind text-sm */
    color: #2563eb; /* Tailwind text-blue-600 */
    text-decoration: none;
  }
  
  .forgot-password a:hover {
    text-decoration: underline;
  }
  
  /* Actions */
  .actions {
    display: flex;
    gap: 1rem;
  }
  
  .actions button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem; /* Tailwind text-sm */
    font-weight: 500; /* Tailwind font-medium */
    border-radius: 0.375rem;
  }
  
  .actions button[type="reset"] {
    background-color: #9ca3af; /* Tailwind bg-gray-400 */
    color: white;
  }
  
  .actions button[type="reset"]:hover {
    background-color: #6b7280; /* Tailwind hover:bg-gray-500 */
  }
  
  .actions button[type="submit"] {
    background-color: #2563eb; /* Tailwind bg-blue-600 */
    color: white;
  }
  
  .actions button[type="submit"]:hover {
    background-color: #1e40af; /* Tailwind hover:bg-blue-700 */
  }
  
  /* Note */
  .note h3 {
    font-size: 1.125rem; /* Tailwind text-lg */
    font-weight: 700; /* Tailwind font-bold */
    color: #1d4ed8; /* Tailwind text-blue-700 */
    margin-bottom: 1rem;
  }
  
  .note p {
    font-size: 0.875rem; /* Tailwind text-sm */
    color: #374151; /* Tailwind text-gray-700 */
    margin-bottom: 1rem;
  }
  </style>
  
  
  