import request from '@/utils/request';
import moment from 'moment';
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
  params.expiredtime = moment(params.expiredtime).format('YYYY-MM-DD')
  return postServer('/api/v2/auth/users/add', params)
}

export async function fakeDelete(params) {
  return postServer('/api/v2/auth/organization/delete', params)
}

export async function fakeUpdate(params) {
  return postServer('/api/v2/auth/organization/update', params)
}

export async function fakeFind(params) {
  return request(`/api/v2/auth/users/find?`,
    {
      params,
    }
  );
}

export async function fakeRoles() {
  return request(`/api/v2/auth/roles/findall`);
}

export async function fakeUpdateRoles(params) {
  return postServer('/api/v2/auth/users/setroles', params)
}

export async function fakeUpdatePwd(params) {
  return postServer('/api/v2/auth/pwd/change', params)
}

export async function fakeGetRole(params) {
  return request(`/api/v2/auth/users/getroles`,
    {
      params,
    }
  );
}



