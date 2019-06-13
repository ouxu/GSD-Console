import React, { memo } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import config from 'configs/sider';
import logo from 'images/logo.png';
import logoText from 'images/logo-text.png';
import styles from './index.less';

const { Sider } = Layout;

const SiderBar = memo(props => {
  const { collapsed = false } = props;
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logoWrap}>
        <Link to="/home">
          <img src={logo} alt="logo" className={styles.logo} />
          <img src={logoText} alt="logo-text" className={styles.logoText} />
        </Link>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span>nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span>nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span>nav 3</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
});

export default SiderBar;
