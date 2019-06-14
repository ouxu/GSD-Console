import React, { useState } from 'react';
import { Form, Button, Input, Card } from 'antd';
import sleep from 'utils/sleep';
import message from 'utils/message';

import styles from './index.less';
import UserMentions from 'components/UserMentions';
import { createProject } from '../services';

const { TextArea } = Input;

const Add = props => {
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        const res = await createProject(values);
        if (res.success) {
          message.success('项目创建成功');
        } else {
          message.success(res.message);
        }
        await sleep(500);
        setLoading(false);
      }
    });
  };
  const onReset = () => {
    props.form.resetFields();
  };
  return (
    <div>
      <Card title="项目创建" className={styles.cardWrap} bordered={false}>
        <Form onSubmit={handleSubmit} className={styles.formWrap}>
          <Form.Item label="项目名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="项目描述">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入密码' }],
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="项目成员">
            {getFieldDecorator('users')(<UserMentions />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              创建
            </Button>
            <Button className={styles.reset} onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(Add);
