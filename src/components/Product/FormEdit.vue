<template>
  <Form
      :model="formState"
      :rules="rules"
      ref="formRef"
      @finish="onFinish"
  >
    <FormItem label="Mã sản phẩm" name="MaSanPham">
      <Input v-model:value="formState.MaSanPham" disabled />
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
import { ref, watch } from "vue";
import { Button, Form, Input, InputNumber } from "ant-design-vue";

export default {
  name: "EditProductForm",
  components: {
    Button,
    Form,
    Input,
    InputNumber,
    FormItem: Form.Item,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formRef = ref(null);
    const formState = ref({ ...props.product });

    // Rules for validation
    const rules = {
      MaSanPham: [{ required: true, message: "Please input!" }],
      Ten: [{ required: true, message: "Please input the name of the product!" }],
      GiaBan: [{ required: true, message: "Please input the Price of the product!" }],
      GiaVonTrungBinh: [{ required: true, message: "Vui lòng nhập giá vốn trung bình!" }],
      NhaCungCap: [{ required: true, message: "Vui lòng nhập nhà cung cấp!" }],
      TinhTrang: [{ required: true, message: "Vui lòng nhập tình trạng sản phẩm!" }],
    };

    // Watch for prop changes to sync form state
    watch(
        () => props.product,
        (newProduct) => {
          formState.value = { ...newProduct }; // Update formState with the new product data
        },
        { immediate: true }
    );

    // Submit handler
    const onFinish = () => {
      console.log("Form submitted:", formState.value);
      emit("save", formState.value); // Emit save event with updated product data
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
