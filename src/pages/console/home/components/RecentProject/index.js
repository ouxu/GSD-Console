import React, { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getProjects } from '../../../project/services';
import styles from '../../style.less';

const RecentProject = () => {
  const [projects, setProject] = useState([]);
  console.log('projects: ', projects);

  useEffect(() => {
    const initProject = async () => {
      const res = await getProjects();
      if (res && res.success && res.data) {
        setProject(res.data.list.slice(0, 6));
      }
    };
    initProject();
  }, []);

  return (
    <Card
      className={styles.projectList}
      style={{ marginBottom: 24 }}
      title="近期项目"
      bordered={false}
      extra={<Link to="/console/project">全部项目</Link>}
      bodyStyle={{ padding: 0 }}
    >
      {projects.map(item => (
        <Card.Grid className={styles.projectGrid} key={item.id}>
          <Card bodyStyle={{ padding: 0 }} bordered={false}>
            <Card.Meta
              title={
                <div className={styles.cardTitle}>
                  <Avatar size="small" src={item.logo || '/favicon.ico'} />
                  <Link to={'/project/' + item.id}>{item.name}</Link>
                </div>
              }
              description={item.description}
            />
            <div className={styles.projectItemContent}>
              <Link to={'/users/' + item.ownerId}>@{item.owner || ''}</Link>
              {item.updatedAt && (
                <span className={styles.datetime} title={item.updatedAt}>
                  {moment(item.updatedAt).fromNow()}
                </span>
              )}
            </div>
          </Card>
        </Card.Grid>
      ))}
    </Card>
  );
};

export default RecentProject;
