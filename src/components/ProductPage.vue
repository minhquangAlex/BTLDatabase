<template>
  <div class="product-container">
    <h2>Danh sách sản phẩm</h2>
    <router-view />
    <DeleteRecord v-if="showDeleteDialog" ref="deleteRecord" @deleteConfirmed="handleDelete" @deleteCancelled="handleCancel" />
    <table class="product-table">
      <thead>
        <tr>
          <th>Mã sản phẩm</th>
          <th>Tên</th>
          <th>Giá bán</th>
          <th>Giá vốn trung bình</th>
          <th>Nhà cung cấp</th>
          <th>Tình trạng</th>
          <th>Hành động</th>
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
          <td>
            <button class="edit-btn">Sửa</button>
            <button class="edit-btn" @click="deleteRecord(product.MaSanPham)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DeleteRecord from "./DeleteRecord.vue";

export default {
  name: "ProductPage",
  components: { DeleteRecord },
  data() {
    return {
      products: [
        {
          MaSanPham: "DepZai",
          Ten: "Boku no Pico",
          GiaBan: "100000",
          GiaVonTrungBinh: "2 billion",
          NhaCungCap: "Japan",
          TinhTrang: "Sold out"
        },
        {
          MaSanPham: "",
          Ten: "",
          GiaBan: "",
          GiaVonTrungBinh: "",
          NhaCungCap: "",
          TinhTrang: ""
        }
      ], // Danh sách sản phẩm sẽ được lấy từ API
      productIdToDelete: null, // Thêm biến để lưu trữ productId cần xóa
      showDeleteDialog: false // Trạng thái hiển thị của hộp thoại xác nhận xóa
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
    },
    deleteRecord(productId) {
      this.productIdToDelete = productId; // Lưu trữ productId cần xóa
      this.showDeleteDialog = true; // Hiển thị hộp thoại xác nhận xóa
    },
    handleDelete() {
      // Thực hiện xóa sản phẩm bằng cách lọc bỏ sản phẩm với productId cần xóa
      this.products = this.products.filter(product => product.MaSanPham !== this.productIdToDelete);
      this.productIdToDelete = null; // Đặt lại biến lưu trữ sau khi xóa thành công
      this.showDeleteDialog = false; // Đóng hộp thoại xác nhận xóa
    },
    handleCancel() {
      this.productIdToDelete = null; // Hủy xóa, đặt lại biến lưu trữ
      this.showDeleteDialog = false; // Đóng hộp thoại xác nhận xóa
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

.edit-btn {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 5px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
