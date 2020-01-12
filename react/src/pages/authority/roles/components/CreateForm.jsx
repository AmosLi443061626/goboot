import { Form, Input, Modal } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const CreateForm = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新建角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="角色名称"
      >
        {form.getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入角色名称',
              min: 1,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(CreateForm);
