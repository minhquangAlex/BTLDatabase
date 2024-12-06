<template>
  <div class="product-container">
    <h2>Danh sách sản phẩm</h2>
    <router-view />
    <DeleteRecord v-if="showDeleteDialog" ref="deleteRecord" @deleteConfirmed="handleDelete" @deleteCancelled="handleCancel" />
    <span>
      <input type="text" placeholder="Tìm kiếm sản phẩm" />
    </span>
    <span>
      <Select v-model="selectedLoai" @change="handleLoaiChange" placeholder="Chọn loại sản phẩm">
        <Option value="Sách">Sách</Option>
        <Option value="Dụng cụ học tập">Dụng cụ học tập</Option>
        <Option value="Phụ kiện sách">Phụ kiện sách</Option>
        <Option value="Giá bán dưới 50k">Giá bán dưới 50k</Option>
      </Select>
    </span>
    <button class="edit-btn" @click="showAddOptions = true">Thêm</button>

    <div v-if="showAddOptions" class="add-options">
      <button @click="handleAdd('Sách')">Sách</button>
      <button @click="handleAdd('Dụng cụ học tập')">Dụng cụ học tập</button>
      <button @click="handleAdd('Phụ kiện sách')">Phụ kiện sách</button>
    </div>
    <table class="product-table">
      <thead>
      <tr>
        <th>Mã sản phẩm</th>
        <th>Tên</th>
        <th>Loại</th>
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
        <td>{{ product.LoaiSanPham}}</td>
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

    <Modal
        v-if="addMode"
        :title="'Thêm sản phẩm: ' + productType"
        v-model:visible="addMode"
        @ok="handleSave"
        :footer="null">
      <FormAdding
          :product="selectedProduct"
          :productType="productType"
          @save="handleSave" />
    </Modal>
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
          :productType="selectedProduct.LoaiSanPham"
          @save="handleSave"
          @cancel="handleCancelEdit" />
    </Modal>

    <!-- Modal Add Product -->
<!--    <Modal-->
<!--        v-if="addMode"-->
<!--        title="Thêm sản phẩm mới"-->
<!--        v-model:visible="addMode"-->
<!--        @cancel="handleCancelEdit"-->
<!--        @ok="handleCancelEdit"-->
<!--        :footer="null">-->
<!--      <FormAdding-->
<!--          :product="selectedProduct"-->
<!--          @save="handleSave" />-->
<!--    </Modal>-->
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue';
import DeleteRecord from "./DeleteRecord.vue";
import FormEdit from "./FormEdit.vue";
import FormAdding from "./FormAdding.vue";
import axios from 'axios';
export default {
  name: "ProductPage",
  components: { DeleteRecord, FormEdit, Modal, FormAdding },
  data() {
    return {
      products: [],
      productIdToDelete: null,
      showDeleteDialog: false,
      editMode: false,
      addMode: false,
      selectedProduct: null,
      showAddOptions: false, // Ẩn/hiện lựa chọn loại sản phẩm
      productType: '', // Loại sản phẩm được chọn
      selectedLoai: ''
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/product');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    deleteRecord(productId) {
      this.productIdToDelete = productId;
      this.showDeleteDialog = true;
    },
    async handleDelete() {
      try {
        await axios.delete(`/product/${this.productIdToDelete}`);
        this.products = this.products.filter(product => product.MaSanPham !== this.productIdToDelete);
        this.productIdToDelete = null;
        this.showDeleteDialog = false;
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    handleCancel() {
      this.productIdToDelete = null;
      this.showDeleteDialog = false;
    },
    handleEdit(product) {
      this.selectedProduct = { ...product };
      this.editMode = true;
    },
    handleCancelEdit() {
      this.editMode = false;
      this.addMode = false;
      this.selectedProduct = null;
    },
    async handleSave(updatedProduct) {
      if (this.editMode) {
        try {
          await axios.put(`http://localhost:3000/product/${updatedProduct.MaSanPham}`, updatedProduct);
          const index = this.products.findIndex(p => p.MaSanPham === updatedProduct.MaSanPham);
          if (index !== -1) {
            this.products.splice(index, 1, updatedProduct);
          }
          this.handleCancelEdit();
        } catch (error) {
          console.error('Error updating product:', error);
        }
      } else if (this.addMode) {
        try {
          await axios.post('/product', updatedProduct);
          this.products.push(updatedProduct);
          this.handleCancelEdit();
        } catch (error) {
          console.error('Error adding product:', error);
        }
      }
      this.handleCancelEdit();
    },
    handleAdd(type) {
      this.productType = type;
      this.selectedProduct = {
        MaSanPham: "",
        Ten: "",
        GiaBan: 0,
        GiaVonTrungBinh: 0,
        NhaCungCap: "",
        TinhTrang: "",
        MauSac: "",
        Loai: "",
        Size: "",
        TheLoai: "",
        NhaXuatBan: "",
        NgayPhatHanh: "",
        TacGia: "",
        NguoiDich: "",
        DinhDang: "",
        SoTrang: "",
        CongDung: "",
        MoTa: "",
        LoaiSanPham: type
      };
      console.log(this.selectedProduct);
      console.log(this.products);
      this.addMode = true;
      this.showAddOptions = false;
    },

    async handleLoaiChange() {
      try {
        if (this.selectedLoai === '') {
          this.fetchProducts();
        } else if (this.selectedLoai === "Giá bán dưới 50k") {
          const response = await axios.get('http://localhost:3000/filter', {
            params: { maxPrice: 50000 }
          });
          this.products = response.data;
          this.fetchProducts();
        } else {
          const response = await axios.get(`http://localhost:3000/product/${this.selectedLoai}`);
          this.products = response.data;
          this.fetchProducts();
        }
      } catch (error) {
        console.error('Error filtering products:', error);
      }
    },

    async handleSearch(id){
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        this.products = response.data;
        this.fetchProducts();
      } catch (error) {
        console.error('Error searching products:', error);
      }
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

.add-options {
  margin-bottom: 1rem;
}
.add-options button {
  margin-right: 0.5rem;
}
</style>
