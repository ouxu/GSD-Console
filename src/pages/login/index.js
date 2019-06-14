import React, { useContext, useState } from 'react';
import sleep from 'utils/sleep';
import { Link } from 'react-router-dom';
import { Form, Button, Icon, Input } from 'antd';
import styles from './index.less';
import { UserContext } from 'contexts/';

const Login = props => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        await user.login(values);
        await sleep(500);
        setLoading(false);
      }
    });
  };
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>
        Great Static Data
        <small>业务静态数据解决方案</small>
      </h2>
      <Form onSubmit={handleSubmit} className={styles.formWrap}>
        <Form.Item>
          {getFieldDecorator('identifier', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} className={styles.loginButton}>
          登录
        </Button>
        <div>
          <Link to="/login/forget">忘记密码</Link>
          <Link className={styles.register} to="/login/register">
            立即注册
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Form.create()(Login);
