import { extend } from 'umi-request';
import { defaultOptions } from 'configs/api';

export const tRequest = extend({
  ...defaultOptions,
  headers: {
    token: window.localStorage.getItem('gsd-token'),
  },
});

export const request = extend(defaultOptions);

export default tRequest;
