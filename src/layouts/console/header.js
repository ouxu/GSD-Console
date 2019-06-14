import React, { memo, useContext } from 'react';
import { Layout, Menu, Icon, Avatar, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Redirect } from 'react-router-dom';

import HeaderSearch from 'components/HeaderSearch';
// import SelectLang from 'components/SelectLang';
import HeaderDropdown from 'components/HeaderDropdown';

import { UserContext } from 'contexts/';

import styles from './index.less';

const { Header } = Layout;

const HeaderBar = memo(props => {
  const { collapsed = false, onTrigger } = props;
  const { user, logout } = useContext(UserContext);
  if (!user.id) {
    return <Redirect to="/login" />;
  }
  const menu = (
    <Menu className={styles.menu} selectedKeys={[]}>
      <Menu.Item key="userCenter">
        <Icon type="user" />
        <FormattedMessage id="menu.account.center" defaultMessage="account center" />
      </Menu.Item>
      <Menu.Item key="userinfo">
        <Icon type="setting" />
        <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={logout}>
        <Icon type="logout" />
        <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className={styles.headerWrap}>
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={onTrigger}
      />
      <div className={styles.right}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={formatMessage({ id: 'component.globalHeader.search' })}
        />
        {user.id ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar size="small" className={styles.avatar} src={user.avatar} alt="avatar" />
              <span className={styles.name}>{user.username}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        {/* <SelectLang className={styles.action} /> */}
      </div>
    </Header>
  );
});

export default HeaderBar;
