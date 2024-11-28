<template>
  <header class="mainheader">
    <div class="mainheader-logo">
      <router-link to="/" class="mainheader-link">
        <img :src="logoImage" alt="Logo" class="mainheader-logo-img" />
        <h1 class="mainheader-title">BookStore</h1>
      </router-link>
    </div>

    <div>
      <router-link v-if="!$route.path.startsWith('/login/admin-page')" to="/login" class="mainheader-login">
        Đăng nhập
      </router-link>
      <button v-else @click="logout" class="mainheader-login">
        Đăng xuất
      </button>
    </div>
  </header>
</template>

<script>
import logoImage from "@/assets/Bia.png"; // Đường dẫn logo

export default {
  name: "MainHeader",
  data() {
    return {
      logoImage,
    };
  },
  methods: {
    logout() {

      this.$router.push('/'); // Chuyển hướng về trang chủ (App.vue)
    }
  }
};
</script>
  
  <style scoped>
  /* Header tổng quan */
  .mainheader {
    padding: 10px 20px;
    background-color: #4f76f5; /* Màu nền xanh */
    color: #fff; /* Màu chữ */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  /* Phần logo và tiêu đề */
  .mainheader-logo {
    display: flex;
    align-items: center;
  }
  
  .mainheader-link {
    display: flex;
    align-items: center;
    text-decoration: none; /* Xóa gạch chân */
    color: inherit; /* Giữ nguyên màu chữ */
  }
  
  .mainheader-logo-img {
    width: 80px;
    height: 80px;
  }
  
  .mainheader-title {
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  
  /* Nút Đăng nhập */
  .mainheader-login {
    color: #fff;
    background-color: #4f76f5;
    padding: 8px 16px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .mainheader-login:hover {
    background-color: #3e5fb4; /* Đổi màu khi hover */
  }
  </style>
  