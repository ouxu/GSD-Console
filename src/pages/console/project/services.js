import request from 'utils/request';

const getProjects = data => {
  return request('/project', { data });
};

export { getProjects };
