/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Typography, Button, Card, List, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { getInstance } from './services';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import withInit from 'components/InitDecorator';
import styles from './index.less';

const { Title } = Typography;

const init = async props => {
  const { id } = props.match.params || '';
  const res = await getInstance({ projectId: id });
  if (res && res.success && res.data) {
    return {
      instance: res.data,
    };
  }
  return {
    error: true,
    errorMsg: res.message,
    errorTitle: '实例信息获取失败',
  };
};

const ProjectManage = props => {
  const { project = {}, instances } = props;
  return (
    <PageHeaderWrapper
      content={
        <div className={styles.pageHeaderContent}>
          <Title level={3}>{project.name || ''}</Title>
          <p>{project.description || '暂无描述'}</p>
          <div>
            <Link style={{marginRight: 8}} to={'/console/project'}>
              <Button type="primary">返回项目列表</Button>
            </Link>
            <Link to={'/console/project/edit?id=' + project.id}>
              <Button>修改项目信息</Button>
            </Link>
          </div>
        </div>
      }
    >
      <Card bodyStyle={{padding: '0 10px'}}>
        <List
          className="demo-loadmore-list"
          header="项目实例列表"
          itemLayout="horizontal"
          dataSource={instances.list}
          renderItem={item => (
            <List.Item actions={[<a>编辑</a>, <a>管理</a>]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={<Link to="https://ant.design">{item.name}</Link>}
                  description={item.description}
                />
                <div>Last Update: {item.updatedAt}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default withInit(init)(ProjectManage);
