import React, { useState } from 'react';
import { Form, Button, Input, Card } from 'antd';
import sleep from 'utils/sleep';
import message from 'utils/message';
import UserMentions from 'components/UserMentions';

import styles from '../add/index.less';
import { getProject, editProject } from '../services';

import withInit from 'components/InitDecorator';
const { TextArea } = Input;

const init = async props => {
  const { id } = props.location.query;
  const res = await getProject(id);
  if (res && res.success && res.data) {
    return {
      project: res.data,
    };
  }
  return {
    error: true,
    errorMsg: res.message,
    errorTitle: '项目信息获取失败',
  };
};

const Edit = props => {
  const { project = {} } = props;
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        values.id = project.id || '';
        setLoading(true);
        const res = await editProject(values);
        if (res.success) {
          message.success('项目信息修改成功');
        } else {
          message.error(res.message);
        }
        await sleep(500);
        setLoading(false);
      }
    });
  };
  return (
    <div>
      <Card title="项目信息修改" className={styles.cardWrap} bordered={false}>
        <Form onSubmit={handleSubmit} className={styles.formWrap}>
          <Form.Item label="项目名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入项目名称' }],
              initialValue: project.name,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="项目描述">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入项目描述' }],
              initialValue: project.description,
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="项目成员">
            {getFieldDecorator('users', {
              initialValue: project.users ? project.users.map(e => '' + e.id) : [],
            })(<UserMentions users={project.users} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(withInit(init)(Edit));
