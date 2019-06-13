import React, { useState } from 'react';
import { Layout } from 'antd';
import styles from './index.less';
import SiderBar from './sider';
import Header from './header';

const { Content } = Layout;

const BasicLayout = props => {
  const [collapsed, onCollapsedChange] = useState(false);
  const onTrigger = () => onCollapsedChange(!collapsed);

  return (
    <Layout className={styles.wrap}>
      <SiderBar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} onTrigger={onTrigger} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
