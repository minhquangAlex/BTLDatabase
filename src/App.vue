<template>
  <div class="app-container">
    <router-view />
    <!-- Header: chỉ hiển thị nếu không ở trang login -->
    <MainHeader v-if="showHeader"/>

    <!-- Background: chỉ hiển thị ở các trang cần thiết -->
    <div v-if="showBackground" class="background-container">
      <img
        :src="backgroundImage"
        alt="Background"
        class="background-image"
      />
    </div>

    <!-- Nội dung chính -->

  </div>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";

export default {
  name: "App",
  components: {
    MainHeader,
  },
  data() {
    return {
      backgroundImage: require("@/assets/Bia.png"), // Đường dẫn đến ảnh nền
    };
  },
  computed: {
    // Kiểm tra route hiện tại để quyết định hiển thị header
    showHeader() {
      // Ẩn header chỉ trên trang đăng nhập (/login)
      const excludedRoutes = ["/login", "/admin/products", "/admin/orders","/admin/employees"];
      return !excludedRoutes.includes(this.$route.path);
    },
    // Kiểm tra route hiện tại để quyết định hiển thị ảnh nền
    showBackground() {
      return this.$route.path === "/"; // Chỉ hiển thị ảnh nền trên trang chủ
    },
  },
};
</script>

<style scoped>
.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Đẩy nền ra sau nội dung */
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
/* Nội dung */
.content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding-top: 2.5rem;
}

/* Tiêu đề */
.title {
  color: #1e3a8a; /* Màu xanh lam (Tailwind text-blue-600) */
  font-size: 2rem; /* Text 4xl */
  font-weight: bold;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .title {
    font-size: 3rem; /* Tăng kích thước text trên màn hình lớn hơn */
  }
}

</style>

