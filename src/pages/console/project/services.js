import request from 'utils/request';

const getProjects = params => {
  return request('/project', { params });
};

const getProject = id => {
  return request('/project/info/:id'.replace(':id', id));
};

const createProject = data => {
  return request.post('/project/create', { data });
};

const editProject = data => {
  return request.post('/project/update', { data });
};

export { getProjects, getProject, createProject, editProject };
