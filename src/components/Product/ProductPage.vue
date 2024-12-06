<template>
  <div class="product-container">
    <h2>Danh sách sản phẩm</h2>
    <router-view />
    <DeleteRecord v-if="showDeleteDialog" ref="deleteRecord" @deleteConfirmed="handleDelete" @deleteCancelled="handleCancel" />
    <span>
      <input type="text" v-model="searchQuery" @input="handleSearch(searchQuery)" placeholder="Tìm kiếm sản phẩm" />
    </span>
    <span>
      <Select v-model:value="selectedLoai" @change="handleLoaiChange" placeholder="Chọn loại sản phẩm">
        <Option value="Tất cả">Tất cả</Option>
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
    <div class="product-table-container">
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
    </div>

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
import { Modal, Select, Option } from 'ant-design-vue';
import DeleteRecord from "./DeleteRecord.vue";
import FormEdit from "./FormEdit.vue";
import FormAdding from "./FormAdding.vue";
import axios from 'axios';
// import { format } from 'date-fns';
export default {
  name: "ProductPage",
  components: { DeleteRecord, FormEdit, Modal, FormAdding, Select, Option},
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
      selectedLoai: '',
      searchQuery: ''
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
        console.log("sanpham",this.products);
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
        await axios.delete(`http://localhost:3000/product/${this.productIdToDelete}`);
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



      console.log("edit",product);
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
          await axios.post('http://localhost:3000/product', updatedProduct);
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

        if (this.selectedLoai === 'Tất cả') {
          this.fetchProducts();
          console.log("Tất cả");
        } else if (this.selectedLoai === 'Giá bán dưới 50k') {
          console.log("Giá bán dưới 50k");
          const response = await axios.get('http://localhost:3000/filter', {
            params: { maxPrice: 50000 }
          });
          this.products = response.data;
        } else {
          console.log("Loại sản phẩm");
          if(this.selectedLoai === 'Sách'){
            const response = await axios.get(`http://localhost:3000/product/Sach`);

            this.products = response.data;

          } else if(this.selectedLoai === 'Dụng cụ học tập'){
            const response = await axios.get(`http://localhost:3000/product/DungCuHocTap`);
            this.products = response.data;

          } else if(this.selectedLoai === 'Phụ kiện sách'){
            const response = await axios.get(`http://localhost:3000/product/PhuKienSach`);
            this.products = response.data;

          }

        }
      } catch (error) {
        console.error('Error filtering products:', error);
      }
    },

    async handleSearch(id){
      try {
        console.log("Tìm kiếm", id);
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        this.products = response.data;
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
.product-table-container {
  max-height: 450px;
  overflow-y: auto;
  border: 1px solid #ddd;
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
  padding: 10px 20px; /* Điều chỉnh padding top/bottom và left/right */
  font-size: 16px; /* Điều chỉnh kích thước font chữ */
}

/* CSS cho input */
input[type="text"] {
  border: 1px solid #d9d9d9; /* Màu viền xám nhạt */
  border-radius: 4px; /* Bo tròn góc */
  padding: 8px 12px; /* Khoảng cách giữa chữ và viền */
  width: 200px; /* Độ rộng của input */
  font-size: 14px; /* Kích thước chữ */
}

/* CSS khi hover */
input[type="text"]:hover {
  border-color: #40a9ff; /* Màu viền xanh khi hover */
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); /* Hiệu ứng shadow */
}

/* CSS khi focus */
input[type="text"]:focus {
  border-color: #40a9ff; /* Màu viền xanh khi focus */
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); /* Hiệu ứng shadow */
  outline: none; /* Loại bỏ outline mặc định */
}

/* CSS cho Select */
.ant-select {
  width: 200px; /* Điều chỉnh độ rộng của Select */
  border: 1px solid #d9d9d9; /* Màu viền xám nhạt */
  border-radius: 4px; /* Bo tròn góc */
}

/* CSS cho dropdown */
.ant-select-dropdown {
  border: 1px solid #d9d9d9; /* Màu viền xám nhạt */
  border-radius: 4px; /* Bo tròn góc */
}

/* CSS cho item trong dropdown */
.ant-select-item {
  padding: 8px 12px; /* Điều chỉnh padding của item */
}

/* CSS khi hover item */
.ant-select-item:hover {
  background-color: #f5f5f5; /* Màu nền khi hover */
}

/* CSS cho item được chọn */
.ant-select-item-selected {
  background-color: #e6f7ff; /* Màu nền khi được chọn */
}
</style>
