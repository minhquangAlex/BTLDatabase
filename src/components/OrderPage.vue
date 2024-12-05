<template>
    <div class="order-container">
      <h2>Danh sách đơn hàng</h2>
      <table class="order-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ giao hàng</th>
            <th>Ngày đặt hàng</th>
            <th>Tình trạng</th>
            <th>Tổng giá tiền</th>
            <th>Phương thức thanh toán</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.MaDonHang">
            <td>{{ order.MaDonHang }}</td>
            <td>{{ order.Ten }}</td>
            <td>{{ order.SDT }}</td>
            <td>{{ order.OrderAddress }}</td>
            <td>{{ order.OrderDay }}</td>
            <td>{{ order.TinhTrang }}</td>
            <id>{{ order.GiaTien }}</id>
            <id>{{ order.PhuongThuc }}</id>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>

  export default {
    name: "OrderTable",
    data() {
      return {
        orders: [] 
      };
    },
    methods: {
      fetchProducts() {
        // Đây là giả lập gọi API, thay thế URL bằng API thực tế của bạn
        fetch("/api/orders")
          .then(response => response.json())
          .then(data => {
            this.products = data;
          })
          .catch(error => {
            console.error("Lỗi khi tải đơn hàng:", error);
          });
      }
    },
    mounted() {
      this.fetchProducts();
    }
  };
  </script>
  
  <style scoped>
  .order-container {
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .order-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .order-table th,
  .order-table td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .order-table th {
    background-color: #4f76f5;
    color: white;
  }
  
  .order-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  </style>