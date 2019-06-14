import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import config from 'configs/sider';
import logo from 'images/logo.png';
import logoText from 'images/logo-text.png';
import styles from './index.less';

const { Sider } = Layout;

const SiderBar = props => {
  const { collapsed = false, location } = props;
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logoWrap}>
        <a href="/">
          <img src={logo} alt="logo" className={styles.logo} />
          <img src={logoText} alt="logo-text" className={styles.logoText} />
        </a>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname || '']}>
        {config.map(e => (
          <Menu.Item key={e.key}>
            <Link to={e.key}>
              <Icon type={e.icon} />
              <span>{e.label}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default withRouter(SiderBar);
