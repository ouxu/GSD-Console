import { extend } from 'umi-request';
import message from './message';

const token = window.localStorage.getItem('gsd-token');

const defaultOptions = {
  maxCache: 10,
  prefix: 'http://127.0.0.1:3003/api',
};

export const tRequest = extend({
  ...defaultOptions,
  headers: {
    token,
  },
});

export const request = extend(defaultOptions);

export default tRequest;
