<template>
  <div class="container">
    <div class="card">
      <main class="main-content">
        <img :src="logoImage" alt="BK TP.HCM Logo" class="logo" />
        <h2 class="title">Đăng nhập bằng tài khoản của bạn:</h2>
        <div class="button-container">
          <button class="login-button" @click="handleLoginRedirect('/login/user-login')">
            <h2 class="button-text">Tài khoản người mua</h2>
          </button>
          <button class="login-button" @click="handleLoginRedirect('/login/admin-login')">
            <h2 class="button-text">Quản trị viên</h2>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import logoImage from "@/assets/Bia.png";
export default {
  name: "LoginPage",
  data() {
    return {
      logoImage,
    };
  },
  methods: {
    handleLoginRedirect(path) {
      this.$router.push(path);
    },
  },
};
</script>
  
  <style scoped>
  /* Tổng quan */
  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb; /* Tailwind bg-gray-50 */
    padding: 3rem 1rem;
    font-weight: bold;
  }
  
  /* Card */
  .card {
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    border: 2px solid black;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Main content */
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  
  /* Logo */
  .logo {
    width: 200px; /* Giữ kích thước nhỏ gọn */
    height: 200px;
    margin-bottom: 20px;
  }
  
  /* Title */
  .title {
    color: #4f76f5;
    margin: 20px 0;
    font-size: 25px;
    text-align: center;
  }
  
  /* Button container */
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  /* Login button */
  .login-button {
    padding: 12px 25px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #4f76f5;
    background-color: #fff;
    cursor: pointer;
    width: 220px;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .login-button:hover {
    background-color: #4f76f5;
    color: white;
  }
  
  /* Button text */
  .button-text {
    color: #000000;
    margin: 5px 0;
    font-size: 19px;
  }
  </style>
  