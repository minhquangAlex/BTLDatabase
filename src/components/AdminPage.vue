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
          <button class="menu-item" @click="showRevenueStats = !showRevenueStats">Thống kê doanh thu</button>
        </div>

        <div v-if="showRevenueStats" class="revenue-stats">
          <label for="startDate">Ngày bắt đầu:</label>
          <input type="date" id="startDate" v-model="startDate">
          <label for="endDate">Ngày kết thúc:</label>
          <input type="date" id="endDate" v-model="endDate">
          <button @click="getRevenueStats">Submit</button>

          <table v-if="revenueStats.length > 0" class="product-table">
            <thead>
            <tr>
              <th>Mã chi nhánh</th>
              <th>Tên chi nhánh</th>
              <th>Doanh thu</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="stat in revenueStats" :key="stat.MaChiNhanh">
              <td>{{ stat.MaChiNhanh }}</td>
              <td>{{ stat.TenChiNhanh }}</td>
              <td>{{ stat.DoanhThu }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import axios from 'axios';

export default {
  name: "AdminPage",
  components: { MainHeader },
  data() {
    return {
      showRevenueStats: false,
      startDate: null,
      endDate: null,
      revenueStats: []
    };
  },
  methods: {
    async getRevenueStats() {
      try {
        console.log('Fetching revenue stats...', this.startDate, this.endDate);
        const response = await axios.get('http://localhost:3000/statistic', {
          data: {
            StartDate: this.startDate,
            EndDate: this.endDate
          }
        });
        this.revenueStats = response.data;
      } catch (error) {
        console.error('Error fetching revenue stats:', error);
      }
    }
  }
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

.product-table {
  overflow-x: auto;
  table-layout: auto;
  justify-content: center;
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

.product-table th {
  background-color: #4f76f5;
  color: white;
}

.product-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>