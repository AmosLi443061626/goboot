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
  return postServer('/api/v2/auth/roles/add', params)
}

export async function fakeDelete(params) {
  return postServer('/api/v2/auth/organization/delete', params)
}

export async function fakeUpdate(params) {
  return postServer('/api/v2/auth/organization/update', params)
}

export async function fakeFind(params) {
  return request(`/api/v2/auth/roles/find`,
    {
      params,
    }
  );
}

export async function fakeMenus() {
  return request(`/api/v2/auth/menus/find`);
}

export async function fakeUpdateMenus(params) {
  return postServer('/api/v2/auth/roles/setmenu', params)
}

export async function fakeGetRoleId(params) {
  return request(`/api/v2/auth/roles/getmenu`,
    {
      params,
    }
  );
}



