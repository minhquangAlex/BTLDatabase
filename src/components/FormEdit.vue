<script>
import { Button, Form, Input, InputNumber } from 'ant-design-vue';

export default {
  name: "FormEdit",
  components: { 
    Button, 
    Form, 
    Input, 
    InputNumber, 
    Forma: Form.Item 
  },
  props: {
    product: Object // Nhận sản phẩm cần chỉnh sửa từ ProductPage
  },
  data() {
    return {
      formState: { ...this.product }, // Sao chép thông tin sản phẩm vào formState để chỉnh sửa
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  watch: {
    product(newVal) {
      // Khi prop product thay đổi, cập nhật lại formState
      this.formState = { ...newVal };
    }
  },
  methods: {
    onFinish(values) {
      this.$emit('save', values); // Gửi thông tin đã chỉnh sửa lên ProductPage
    }
  },
};
</script>

<template>
  <Form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" @finish="onFinish">
    <Forma label="Mã sản phẩm" name="MaSanPham">
      <Input v-model="formState.MaSanPham" />
    </Forma>
    <Forma label="Tên sản phẩm" name="Ten">
      <Input v-model="formState.Ten" />
    </Forma>
    <Forma label="Giá bán" name="GiaBan">
      <InputNumber v-model="formState.GiaBan" style="width: 100%" />
    </Forma>
    <Forma label="Giá vốn trung bình" name="GiaVonTrungBinh">
      <InputNumber v-model="formState.GiaVonTrungBinh" style="width: 100%" />
    </Forma>
    <Forma label="Nhà cung cấp" name="NhaCungCap">
      <Input v-model="formState.NhaCungCap" />
    </Forma>
    <Forma label="Tình trạng" name="TinhTrang">
      <Input v-model="formState.TinhTrang" />
    </Forma>
    <Forma>
      <Button type="primary" htmlType="submit">Lưu</Button>
    </Forma>
  </Form>
</template>

<style scoped>
/* Add styles here if needed */
</style>
