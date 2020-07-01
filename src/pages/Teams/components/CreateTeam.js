/* eslint-disable */
import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './CreateTeam.css';

const CreateTeamForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      className="t-modal"
      visible={visible}
      title="Create New Team"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        className="t-form"
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{modifier: 'public'}}
      >
        <Form.Item name="Team Name" label="Team Name"
          rules={[{
              required: true,
              message: 'Please input the team name',
            },]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Facebook Page Id" label="Facebook Page Id">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CreateTeam = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div className="t-btn-content">
      <Button type="primary" icon={<PlusOutlined />} shape="round" size="large" onClick={() => { setVisible(true); }}> Create New Team </Button>
      <CreateTeamForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => { setVisible(false); }}
      />
    </div>
  );
};

export default CreateTeam
