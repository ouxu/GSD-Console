/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Typography, Button, Icon } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import { Ellipsis } from 'ant-design-pro';
import styles from './index.less';
import { getProjects } from './services';

import withInit from 'components/InitDecorator';
const { Title } = Typography;

const init = async props => {
  const res = await getProjects();
  if (res && res.success && res.data) {
    return {
      projects: res.data,
    };
  }
  return {
    error: true,
    errorMsg: res.message,
  };
};
const Project = props => {
  const { projects = {} } = props;

  const list = projects.list || [];
  const content = (
    <div className={styles.pageHeaderContent}>
      <Title level={3}>项目管理</Title>
      <p>GSD平台以项目维度管理静态数据，项目粒度可由用户自由控制。</p>
      <div className={styles.contentLink}>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
          快速开始
        </a>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
          产品简介
        </a>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
          产品文档
        </a>
      </div>
    </div>
  );

  const extraContent = (
    <div className={styles.extraImg}>
      <img
        alt="这是一个标题"
        src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
      />
    </div>
  );

  return (
    <PageHeaderWrapper content={content} extraContent={extraContent}>
      <div className={styles.cardList}>
        <List
          rowKey="id"
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={['', ...list]}
          renderItem={item =>
            item ? (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  className={styles.card}
                  actions={[
                    <Link to={'/console/project' + item.id}>管理项目</Link>,
                    <Link to={'/console/project/edit?id=' + item.id}>修改项目</Link>,
                  ]}
                >
                  <Card.Meta
                    avatar={
                      <img
                        className={styles.cardAvatar}
                        src={item.avatar || '/favicon.ico'}
                        alt=""
                      />
                    }
                    title={<Link to={'/console/project/' + item.id}>{item.name}</Link>}
                    description={
                      <Ellipsis className={styles.item} lines={3}>
                        {item.description}
                      </Ellipsis>
                    }
                  />
                </Card>
              </List.Item>
            ) : (
              <List.Item>
                <Button type="dashed" className={styles.newButton}>
                  <Link to="/console/project/add">
                    <Icon type="plus" /> 新建项目
                  </Link>
                </Button>
              </List.Item>
            )
          }
        />
      </div>
    </PageHeaderWrapper>
  );
};

export default withInit(init)(Project);
