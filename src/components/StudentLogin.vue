<template>
    <div class="container">
      <div class="card">
        <!-- Tiêu đề chính -->
        <div class="header">
          <h2>DỊCH VỤ XÁC THỰC TẬP TRUNG</h2>
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
              <div class="actions">
                <button type="reset">Xóa</button>
                <button type="submit">Đăng nhập</button>
              </div>
            </form>
          </div>
  
          <!-- Ghi chú -->
          <div class="note">
            <h3>Lưu ý</h3>
            <p>
              Trang đăng nhập này cho phép đăng nhập một lần đến nhiều hệ thống
              web ở trường Đại học Bách Khoa TP.HCM. Điều này có nghĩa là bạn chỉ
              đăng nhập một lần cho những hệ thống web đã đăng ký với hệ thống xác
              thực quản lý truy cập tập trung.
            </p>
            <p>
              Bạn cần dùng tài khoản HCMUT để đăng nhập. Tài khoản HCMUT cho phép
              truy cập đến nhiều tài nguyên bao gồm hệ thống thông tin, thư điện
              tử,...
            </p>
            <p>
              Vì lý do an ninh, bạn hãy thoát khỏi trình duyệt Web khi bạn kết thúc
              việc truy cập các dịch vụ đòi hỏi xác thực!
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
    name: "StudentLogin",
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
        alert("Đăng nhập thành công!");
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
  
  