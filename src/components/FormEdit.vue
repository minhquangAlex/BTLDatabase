<script>
import {
  Button,
  Form,
  Input,
  InputNumber,
} from 'ant-design-vue';

  export default {
    name: "FormEdit",
    components: { Button,Form, Input, InputNumber,Forma: Form.Item },
    data() {
      return {
        formState: {
          // initial values
        },
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      };
    },
    methods: {
    }
  };
</script>

<template>
  <Form
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      @finish="onFinish"
  >
    <Forma
        label="Mã sản phẩm"
        name="MaSanPham"
    >
      <Input />
    </Forma>

    <Forma
        label="Tên sản phẩm"
        name="Ten"
    >
      <Input />
    </Forma>

    <Forma
        label="Giá bán"
        name="GIaBan"
    >
      <Input />
    </Forma>
    <Forma
        label="Giá vốn trung bình"
        name="GiaVonTrungBinh"
    >
      <InputNumber style="width: 100%" />
    </Forma>

    <Forma
        label="Nhà cung cấp"
        name="NhaCungCap"
        rules={[
        {
        required: true,
    },
    ]}
    >
    <Input />
    </Forma>
    <Forma
        label="Tình trạng"
        name="TinhTrang"
        rules={[{ required: true
    >
    <Input />
    </Forma>
    <Forma>
      <Button htmlType="submit">
        Lưu
      </Button>
    </Forma>
  </Form>
</template>

<style scoped>

</style>