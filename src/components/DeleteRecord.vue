<template>
    <div>
      <p>Bạn có chắc chắn muốn xóa bản ghi này không?</p>
      <button @click="confirmDelete">Xác nhận</button>
      <button @click="cancelDelete">Hủy bỏ</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "DeleteRecord",
    props: {
      productId: {
        type: String,
        required: true,
      },
    },
    methods: {
      confirmDelete() {
        // Gửi sự kiện lên cha để xử lý xóa
        this.$emit("deleteConfirmed", this.productId);
      },
      cancelDelete() {
        // Đóng hộp thoại xác nhận
        this.$emit("deleteCancelled");
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:first-child {
    background-color: #d9534f;
    color: white;
  }
  
  button:last-child {
    background-color: #5bc0de;
    color: white;
  }
  </style>
  
