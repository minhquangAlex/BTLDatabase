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
          <button>Xóa</button>
        </td>
      </tr>
      </tbody>
    </table>
    <Modal v-if="editMode && selectedProduct"
             title="Chỉnh sửa thông tin sản phẩm"
             :visible="editMode"
             @cancel="handleCancelEdit"
             @ok="handleCancelEdit"
             :footer="null"
    >
      <FormEdit :product="selectedProduct"
                @save="handleSave"
                @cancel="handleCancelEdit"
      />
    </Modal>
  </div>
</template>

<script>
import FormEdit from "./FormEdit.vue";
import { Modal } from 'ant-design-vue';
export default {
  name: "ProductTable",
  components: { FormEdit, Modal },
  data() {
    return {
      products: [{
          MaSanPham: "SP001",
          Ten: "Áo thun nam",
          GiaBan: 100000,
          GiaVonTrungBinh: 50000,
          NhaCungCap: "NCC001",
          TinhTrang: "Còn hàng",
      },

        // ... (dữ liệu sản phẩm)
      ],
      editMode: false,
      selectedProduct: null
    };
  },
  methods: {
    handleEdit(product) {
      this.selectedProduct = product;
      this.editMode = true;
    },
    handleCancelEdit() {
      this.editMode = false;
      this.selectedProduct = null;
    },
    handleSave(updatedProduct) {
      const index = this.products.findIndex(p => p.MaSanPham === updatedProduct.MaSanPham);
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct);
      }
      this.handleCancelEdit();
    },
    // ... (Các hàm khác)
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