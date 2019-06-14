import request from 'umi-request';

export async function queryProjectNotice() {
  return request('/api/console-home/project/notice');
}

export async function queryActivities() {
  return request('/api/console-home/activities');
}

export async function fakeChartData() {
  return request('/api/console-home/fake_chart_data');
}

export async function queryCurrent() {
  return request('/api/console-home/currentUser');
}
