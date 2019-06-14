import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import { GlobalFooter } from 'ant-design-pro';
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
        <Content>
          {props.children}
          <GlobalFooter
            copyright={
              <div>
                Copyright <Icon type="copyright" /> {new Date().getFullYear()} Design By
                <a href="https://outxu.cn"> John.Xu</a>
              </div>
            }
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
