import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './index.less';
import logo from 'images/logo-full.png';

const { Header, Content } = Layout;

export default ({ children }) => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.headerContent}>
          <a href="/">
            <img className={styles.logo} src={logo} alt="logo" />
          </a>
        </div>
      </Header>
      <Content className={styles.wrap}>{children}</Content>
    </Layout>
  );
};
