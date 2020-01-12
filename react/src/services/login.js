import request from '@/utils/request';
import { jsonToURLParams } from '@/utils/utils';
export async function fakeAccountLogin(params) {
  return request('/api/v1/logins/glogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: jsonToURLParams(params),
  })
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
