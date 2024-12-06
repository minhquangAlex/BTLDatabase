<template>
  <Form
      :model="formState"
      :rules="rules"
      ref="formRef"
      @finish="onFinish"
  >
    <FormItem v-if="productType === 'Sách' " label="Mã sách" name="MaSach">
      <Input v-model:value="formState.MaSanPham" />
    </FormItem>
    <FormItem v-else-if="productType === 'Dụng cụ học tập' " label="Mã dụng cụ" name="MaSach">
      <Input v-model:value="formState.MaSanPham" />
    </FormItem>
    <FormItem v-else label="Mã phụ kiện" name="MaSanPham">
      <Input v-model:value="formState.MaSanPham" />
    </FormItem>

    <FormItem label="Tên sản phẩm" name="Ten" :rules="[{ required: true, message: 'Please input the name of the product!' }]">
      <Input v-model:value="formState.Ten" />
    </FormItem>

    <FormItem v-if="productType === 'Phụ kiện sách' || productType === 'Dụng cụ học tập' " label="Màu sắc" name="MauSac">
      <Input v-model:value="formState.MauSac" />
    </FormItem>

    <FormItem v-if="productType === 'Sách' || productType === 'Dụng cụ học tập' " label="Size" name="Size">
      <Input v-model:value="formState.Size" />
    </FormItem>

    <FormItem v-if="productType === 'Dụng cụ học tập' " label="Loại" name="Loai">
      <Input v-model:value="formState.Loai" />
    </FormItem>

    <FormItem v-if="productType === 'Sách' " label="Thể loại" name="TheLoai">
      <Input v-model:value="formState.TheLoai" />
    </FormItem>

    <FormItem v-if="productType === 'Sách' " label="Nhà xuất bản" name="NhaXuatBan">
      <Input v-model:value="formState.NhaXuatBan" />
    </FormItem>

    <FormItem v-if="productType === 'Sách'" label="Ngày phát hành" name="NgayPhatHanh">
      <Input v-model:value="formState.NgayPhatHanh" />
    </FormItem>


    <FormItem v-if="productType === 'Sách' " label="Tác giả" name="TacGia">
      <Input v-model:value="formState.TacGia" />
    </FormItem>

    <FormItem v-if="productType === 'Sách' " label="Người dịch" name="NguoiDich">
      <Input v-model:value="formState.NguoiDich" />
    </FormItem>

    <FormItem v-if="productType === 'Sách' " label="Định dạng" name="DinhDang">
      <Input v-model:value="formState.DinhDang" />
    </FormItem>

    <FormItem v-if="productType === 'Sách' " label="Số trang" name="SoTrang">
      <Input v-model:value="formState.SoTrang" />
    </FormItem>

    <FormItem v-if="productType === 'Phụ kiện sách' " label="Công dụng" name="CongDung">
      <Input v-model:value="formState.CongDung" />
    </FormItem>

    <FormItem v-if="productType === 'Phụ kiện sách' " label="Mô tả" name="MoTa">
      <Input v-model:value="formState.MoTa" />
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
import { Button, Form, Input, InputNumber } from "ant-cesign-vue";

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
    productType: { // Nhận prop productType
      type: String,
      required: true,
    }
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
