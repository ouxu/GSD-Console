import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List, Avatar } from 'antd';
import { UserContext } from 'contexts/';
import { quickOp } from 'configs/home';
import PageHeaderWrapper from './components/PageHeaderWrapper';
import EditableLinkGroup from './components/EditableLinkGroup';
import RecentProject from './components/RecentProject';

import styles from './style.less';

const Home = () => {
  const { user } = useContext(UserContext);
  const pageHeaderContent =
    user && Object.keys(user).length ? (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={user.avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{user.username}，祝你开心每一天！</div>
          <div>{user.signature || '暂无签名~'}</div>
        </div>
      </div>
    ) : null;

  const extraContent = (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <p>项目数</p>
        <p>-</p>
      </div>
      <div className={styles.statItem}>
        <p>数据结构数</p>
        <p>-</p>
      </div>
      <div className={styles.statItem}>
        <p>数据访问次数</p>
        <p>-</p>
      </div>
    </div>
  );

  return (
    <PageHeaderWrapper content={pageHeaderContent} extraContent={extraContent}>
      <Row gutter={24} className={styles.wrap}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <RecentProject />
          <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            className={styles.activeCard}
            title="动态"
          >
            <List size="large">
              {/* <div className={styles.activitiesList}>{this.renderActivities()}</div> */}
            </List>
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ marginBottom: 24 }}
            title="快速开始 / 便捷导航"
            bordered={false}
            bodyStyle={{ padding: 0 }}
          >
            <EditableLinkGroup onAdd={() => {}} links={quickOp} linkElement={Link} />
          </Card>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};

export default Home;
