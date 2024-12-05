<script>
import { Modal } from 'ant-design-vue';
import DeleteRecord from "./DeleteRecord.vue";
import FormAdding from "./FormAdding.vue"; // Import form thêm sản phẩm
import FormEdit from "./FormEdit.vue";

export default {
  name: "ProductPage",
  components: { DeleteRecord, FormEdit, Modal, FormAdding }, // Thêm FormAdding vào components
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
          MaSanPham: "SP001",
          Ten: "Áo thun nam",
          GiaBan: 100000,
          GiaVonTrungBinh: 50000,
          NhaCungCap: "NCC001",
          TinhTrang: "Còn hàng",
        }
      ], 
      productIdToDelete: null,
      showDeleteDialog: false, 
      editMode: false, 
      addMode: false, // Thêm chế độ addMode
      selectedProduct: null
    };
  },
  methods: {
    fetchProducts() {
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
      this.productIdToDelete = productId;
      this.showDeleteDialog = true;
    },
    handleDelete() {
      this.products = this.products.filter(product => product.MaSanPham !== this.productIdToDelete);
      this.productIdToDelete = null;
      this.showDeleteDialog = false;
    },
    handleCancel() {
      this.productIdToDelete = null;
      this.showDeleteDialog = false;
    },
    handleEdit(product) {
      this.selectedProduct = { ...product }; // Sao chép dữ liệu sản phẩm
      this.editMode = true;
    },
    handleCancelEdit() {
      this.editMode = false;
      this.selectedProduct = null;
    },
    handleSave(updatedProduct) {
      // Cập nhật sản phẩm trong mảng
      const index = this.products.findIndex(p => p.MaSanPham === updatedProduct.MaSanPham);
      if (index !== -1) {
        // Cập nhật lại đối tượng sản phẩm trong mảng
        this.products[index] = { ...updatedProduct };
      }
      this.handleCancelEdit();
    },
    handleAdd(newProduct) {
      // Thêm sản phẩm mới vào danh sách
      this.products.push(newProduct);
      this.addMode = false; // Tắt chế độ thêm sản phẩm
    },
    handleCancelAdd() {
      this.addMode = false; // Tắt chế độ thêm sản phẩm khi hủy
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<template>
  <div class="product-container">
    <h2>Danh sách sản phẩm</h2>
    <router-view />
    <DeleteRecord v-if="showDeleteDialog" ref="deleteRecord" @deleteConfirmed="handleDelete" @deleteCancelled="handleCancel" />
    
    <!-- Hiển thị form thêm sản phẩm nếu addMode là true -->

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
            <button class="edit-btn" @click="handleEdit(product)">Sửa</button>
            <button class="edit-btn" @click="deleteRecord(product.MaSanPham)">Xóa</button>
            <button class="edit-btn" @click="handleAdd(product)">Thêm</button> <!-- Thêm sự kiện mở form thêm -->
          </td>
        </tr>
      </tbody>
    </table>

    <Modal v-if="addMode" title="Thêm sản phẩm" @cancel="handleCancelAdd" @ok="handleCancelAdd" :footer="null">
      <FormAdding @save="handleAdd" @cancel="handleCancelAdd" />
    </Modal>

    <Modal v-if="addMode && selectedProduct"  
             title="Thêm thông tin sản phẩm"
             :visible="editMode"
             @cancel="handleCancelEdit"
             @ok="handleCancelEdit"
             :footer="null">
             <FormEdit :product="selectedProduct" 
                @save="handleSave"
                @cancel="handleCancelEdit"
      />
    </Modal>

  </div>
</template>

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
