import request from '@/utils/request';
import { jsonToURLParams } from '@/utils/utils';

const postServer = (url, params) => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: jsonToURLParams(params),
  });
}

export async function fakeSubmitForm(params) {
  return postServer('/api/v2/auth/organization/add', params)
}

export async function fakeDelete(params) {
  return postServer('/api/v2/auth/organization/delete', params)
}

export async function fakeUpdate(params) {
  return postServer('/api/v2/auth/organization/update', params)
}

export async function fakeFind() {
  return request(`/api/v2/auth/organization/find`);
}


