<template>
  <div class="product-container">
    <h2>Danh sách sản phẩm</h2>
    <router-view />
    <DeleteRecord v-if="showDeleteDialog" ref="deleteRecord" @deleteConfirmed="handleDelete" @deleteCancelled="handleCancel" />
    <button class="edit-btn" @click="handleAdd">Thêm</button>
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

        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal Edit Product -->
    <Modal
        v-if="editMode"
        title="Chỉnh sửa thông tin sản phẩm"
        v-model:visible="editMode"
        @cancel="handleCancelEdit"
        @ok="handleCancelEdit"
        :footer="null">
      <FormEdit
          :product="selectedProduct"
          @save="handleSave"
          @cancel="handleCancelEdit" />
    </Modal>

    <!-- Modal Add Product -->
    <Modal
        v-if="addMode"
        title="Thêm sản phẩm mới"
        v-model:visible="addMode"
        @cancel="handleCancelEdit"
        @ok="handleCancelEdit"
        :footer="null">
      <FormAdding
          :product="selectedProduct"
          @save="handleSave" />
    </Modal>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue';
import DeleteRecord from "./DeleteRecord.vue";
import FormEdit from "./FormEdit.vue";
import FormAdding from "./FormAdding.vue";

export default {
  name: "ProductPage",
  components: { DeleteRecord, FormEdit, Modal, FormAdding },
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
      addMode: false, // Để mở modal thêm sản phẩm
      selectedProduct: null
    };
  },
  methods: {
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
      this.editMode = true; // Hiển thị modal chỉnh sửa
    },
    handleCancelEdit() {
      this.editMode = false;
      this.addMode = false;
      this.selectedProduct = null;
    },
    handleSave(updatedProduct) {
      if (this.editMode) {
        const index = this.products.findIndex(p => p.MaSanPham === updatedProduct.MaSanPham);
        if (index !== -1) {
          this.products[index] = { ...updatedProduct };
        }
      } else if (this.addMode) {
        // Thêm sản phẩm mới vào danh sách
        this.products.push(updatedProduct);
      }
      this.handleCancelEdit();
    },
    handleAdd() {
      this.selectedProduct = { MaSanPham: "", Ten: "", GiaBan: "", GiaVonTrungBinh: "", NhaCungCap: "", TinhTrang: "" };
      this.addMode = true; // Hiển thị modal thêm mới
    }
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
