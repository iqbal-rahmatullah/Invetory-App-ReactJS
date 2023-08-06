import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";

function FormItem() {
  const onFinish = (values) => {
    axios({
      method: "post",
      url: "http://localhost:3000",
      data: values,
    })
      .then((result) => {
        Swal.fire("Good job!", "You clicked the button!", "success");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name='basic'
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 15,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: "Please input name item!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Price'
          name='price'
          rules={[
            {
              required: true,
              message: "Please input price item!",
            },
          ]}>
          <InputNumber prefix={<DollarOutlined />} />
        </Form.Item>

        <Form.Item
          label='Stock'
          name='stock'
          rules={[
            {
              required: true,
              message: "Please input stock item!",
            },
          ]}>
          <InputNumber />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 15,
          }}>
          <Button type='primary' htmlType='submit' block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormItem;
