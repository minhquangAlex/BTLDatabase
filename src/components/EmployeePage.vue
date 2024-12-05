<template>
    <div class="employee-container">
      <h2>Danh sách nhân viên</h2>
      <table class="employee-table">
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Tên</th>
            <th>Loại nhân viên</th>
            <th>Giới tính</th>
            <th>Số điện thoại</th>
            <th>Ngày sinh</th>
            <th>Hệ số lương</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.MaSanPham">
            <td>{{ employee.ID }}</td>
            <td>{{ employee.Ten }}</td>
            <td>{{ employee.LoaiNhanVien }}</td>
            <td>{{ employee.GioiTinh }}</td>
            <td>{{ employee.SDT }}</td>
            <td>{{ employee.NgaySinh }}</td>
            <td>{{ employee.HeSoLuong }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>

  export default {
    name: "EmployeeTable",
    data() {
      return {
        products: [] // Danh sách sản phẩm sẽ được lấy từ API
      };
    },
    methods: {
      fetchProducts() {
        // Đây là giả lập gọi API, thay thế URL bằng API thực tế của bạn
        fetch("/api/employees")
          .then(response => response.json())
          .then(data => {
            this.products = data;
          })
          .catch(error => {
            console.error("Lỗi khi tải sản phẩm:", error);
          });
      }
    },
    mounted() {
      this.fetchProducts();
    }
  };
  </script>
  
  <style scoped>
  .employee-container {
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .employee-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .employee-table th,
  .employee-table td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .employee-table th {
    background-color: #4f76f5;
    color: white;
  }
  
  .employee-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  </style>