/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import moment from 'moment';

import { Typography, Button, Card, List, Skeleton, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getProject, getInstances } from '../services';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import withInit from 'components/InitDecorator';
import mainStyles from '../index.less';

const { Title } = Typography;

const init = async props => {
  const { id } = props.match.params || '';
  const res = await getProject(id);
  const instances = await getInstances({ projectId: id });
  if (res && res.success && res.data) {
    return {
      project: res.data,
      instances: instances.data,
    };
  }
  return {
    error: true,
    errorMsg: res.message,
    errorTitle: '项目信息获取失败',
  };
};

const ProjectManage = props => {
  const { project = {}, instances } = props;
  return (
    <PageHeaderWrapper
      content={
        <div className={mainStyles.pageHeaderContent}>
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
      <Card bodyStyle={{ padding: '0 10px' }}>
        <List
          className="demo-loadmore-list"
          header="项目实例列表"
          itemLayout="horizontal"
          dataSource={['', ...instances.list]}
          renderItem={item =>
            item ? (
              <List.Item
                actions={[<Link to={'/console/instance/' + item.id}>编辑</Link>, <a>删除</a>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={<Link to={'/console/instance/' + item.id}>{item.name}</Link>}
                    description={item.description}
                  />
                  <div>Last Update: {moment(item.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</div>
                </Skeleton>
              </List.Item>
            ) : (
              <List.Item>
                <Button type="dashed" style={{ width: '100%' }}>
                  <Icon type="plus" /> 新增实例
                </Button>
              </List.Item>
            )
          }
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default withInit(init)(ProjectManage);
