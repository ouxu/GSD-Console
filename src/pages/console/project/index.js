/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import router from 'umi/router';
import { Card, List, Typography, Button, Icon, Input } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import { Ellipsis } from 'ant-design-pro';
import styles from './index.less';
import { getProjects } from './services';

import withInit from 'components/InitDecorator';
const { Title } = Typography;

const init = async props => {
  const { keyword = '' } = props.location.query;
  const res = await getProjects({ keyword });
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
  const { projects = {}, location, loading } = props;
  const { keyword = '' } = location.query;

  const onKeywordChange = e => {
    router.replace({
      pathname: location.pathname,
      query: {
        keyword: e.target.value,
      },
    });
  };
  const onReset = () => {
    router.replace({
      pathname: location.pathname,
    });
    props.reInit();
  };
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
        <Card className={styles.filterBar} bodyStyle={{ margin: 0, padding: 0 }}>
          <Input
            defaultValue={keyword}
            onBlur={onKeywordChange}
            className={styles.filterKeyword}
            placeholder="请输入关键词"
          />
          <Button onClick={props.reInit} type="primary" style={{marginRight: 8}}>
            搜索
          </Button>
          <Button onClick={onReset}>
            重置
          </Button>
        </Card>
        <List
          loading={loading}
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
                    <Link to={'/console/project/' + item.id}>管理项目实例</Link>,
                    <Link to={'/console/project/edit?id=' + item.id}>修改项目信息</Link>,
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

export default withInit(init, true)(Project);
