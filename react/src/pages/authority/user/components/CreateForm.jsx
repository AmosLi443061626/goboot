import { Form, Input, Modal, DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

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
      title="新建用户"
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
        label="登录名"
      >
        {form.getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入用户名',
              min: 1,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="密码"
      >
        {form.getFieldDecorator('passwd', {
          rules: [
            {
              required: true,
              message: '请输入至少6位的密码',
              min: 6,
            },
          ],
        })(<Input placeholder="请输入" type="password" />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="别名"
      >
        {form.getFieldDecorator('aliasname')(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="过期时间"
      >
        {form.getFieldDecorator('expiredtime', {
          initialValue: moment('2020-01-01', 'YYYY-MM-DD'),
        })(<DatePicker
          style={{
            width: '100%',
          }}
          format={'YYYY-MM-DD'}
        />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="联系电话"
      >
        {form.getFieldDecorator('phone',{
          rules: [
            {
              required: true,
              message: '请输入联系电话',
              min: 1,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(CreateForm);
