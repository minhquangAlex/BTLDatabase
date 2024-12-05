<template>
    <div class="product-container">
      <h2>Danh sách sản phẩm</h2>
      <table class="product-table">
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên</th>
            <th>Giá bán</th>
            <th>Giá vốn trung bình</th>
            <th>Nhà cung cấp</th>
            <th>Tình trạng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.MaSanPham">
            <td>{{ product.MaSanPham }}</td>
            <td>{{ product.Ten }}</td>
            <td>{{ product.GiaBan }}</td>
            <td>{{ product.GiaVonTrungBinh }}</td>
            <td>{{ product.NhaCungCap }}</td>
            <td>{{ product.TinhTrang }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>

  export default {
    name: "ProductTable",
    data() {
      return {
        products: [] // Danh sách sản phẩm sẽ được lấy từ API
      };
    },
    methods: {
      fetchProducts() {
        // Đây là giả lập gọi API, thay thế URL bằng API thực tế của bạn
        fetch("/api/products")
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
  .product-container {
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .product-table {
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