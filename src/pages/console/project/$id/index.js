import React from 'react';

const ProjectManage = props => {
  const { id } = props.match.params || '';

  return <div>{id}</div>;
};

export default ProjectManage;
