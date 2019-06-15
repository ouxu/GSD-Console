import request from 'utils/request';
import umiRequest from 'umi-request';


const getInstance = id => {
  return request.get('/instance/info/:id'.replace(':id', id));
};

const getInstanceData = path => {
  return umiRequest.get(path, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
      t: +Date.now()
    }
  });
};

const updateItem = data => {
  return request.post('/instance/updateItem', { data });
};

export { getInstance, getInstanceData, updateItem };
