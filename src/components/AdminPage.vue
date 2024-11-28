<template>
  <div class="container">
    <MainHeader />
    <div class="card">
      <div class="card-header">
        <h2 style="display: flex; justify-content: center;">Admin Dashboard</h2>
      </div>
      <div class="card-body">
        <div class="menu">
          <router-link to="/admin/products" class="menu-item">Sản phẩm</router-link>
          <router-link to="/admin/orders" class="menu-item">Đơn hàng</router-link>
          <router-link to="/admin/employees" class="menu-item">Nhân viên</router-link>
        </div>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "AdminPage",
  components: {MainHeader},
};
</script>

<style scoped>
.container {
  min-height: 190vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #F7EDEC;
  padding: 1rem 1rem;
  font-weight: bold;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 80%;
  max-width: 800px;
}

.card-header {
  background-color: #4f76f5;
  color: #fff;
  padding: 1rem;
}

.card-body {
  padding: 1rem;
}

.menu {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.menu-item {
  background-color: #e5e7eb;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #d1d5db;
}
.h2 {
  display: flex;
  justify-content: center;
}
</style>