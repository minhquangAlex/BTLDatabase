<template>
  <Form
      :model="formState"
      :rules="rules"
      ref="formRef"
      @finish="onFinish"
  >
    <FormItem label="Mã sản phẩm" name="MaSanPham">
      <Input v-model:value="formState.MaSanPham" />
    </FormItem>

    <FormItem label="Tên sản phẩm" name="Ten" :rules="[{ required: true, message: 'Please input the name of the product!' }]">
      <Input v-model:value="formState.Ten" />
    </FormItem>

    <FormItem label="Giá bán" name="GiaBan" :rules="[{ required: true, message: 'Please input the Price of the product!' }]">
      <InputNumber v-model:value="formState.GiaBan" style="width: 100%" />
    </FormItem>

    <FormItem label="Giá vốn trung bình" name="GiaVonTrungBinh" :rules="[{ required: true, message: 'Please input giá vốn trung bình!' }]">
      <Input v-model:value="formState.GiaVonTrungBinh" />
    </FormItem>

    <FormItem label="Nhà cung cấp" name="NhaCungCap" :rules="[{ required: true, message: 'Please input the supplier of the product!' }]">
      <Input v-model:value="formState.NhaCungCap" />
    </FormItem>

    <FormItem label="Tình trạng" name="TinhTrang" :rules="[{ required: true, message: 'Please input the status of the product!' }]">
      <Input v-model:value="formState.TinhTrang" />
    </FormItem>

    <FormItem>
      <Button type="primary" htmlType="submit">Lưu</Button>
    </FormItem>
  </Form>
</template>

<script>
import { ref } from "vue";
import { Button, Form, Input, InputNumber } from "ant-design-vue";

export default {
  name: "FormAdding",
  components: {
    Button,
    Form,
    Input,
    InputNumber,
    FormItem: Form.Item,
  },
  setup(props, { emit }) {
    const formRef = ref(null);

    // Initial empty form state for a new product
    const formState = ref({
      MaSanPham: "",
      Ten: "",
      GiaBan: null,
      GiaVonTrungBinh: "",
      NhaCungCap: "",
      TinhTrang: "",
    });

    // Rules for validation
    const rules = {
      MaSanPham: [{ required: true, message: "Please input the product code!" }],
      Ten: [{ required: true, message: "Please input the name of the product!" }],
      GiaBan: [{ required: true, message: "Please input the price of the product!" }],
      GiaVonTrungBinh: [{ required: true, message: "Please input the average cost!" }],
      NhaCungCap: [{ required: true, message: "Please input the supplier!" }],
      TinhTrang: [{ required: true, message: "Please input the product status!" }],
    };

    // Submit handler
    const onFinish = () => {
      console.log("Form submitted:", formState.value);
      emit("save", formState.value); // Emit the event to save the product data
    };

    return {
      formRef,
      formState,
      rules,
      onFinish,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles for your form */
</style>
