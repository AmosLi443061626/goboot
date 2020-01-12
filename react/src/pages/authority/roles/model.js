import { message } from 'antd';
import { fakeSubmitForm, fakeDelete, fakeUpdate, fakeFind, fakeMenus, fakeUpdateMenus, fakeGetRoleId } from './service';

const Model = {
  namespace: 'authorityRoles',
  state: {},
  effects: {
    *submitForm({ payload }, { call }) {
      const response = yield call(fakeSubmitForm, payload);
      response.code == 200 ? message.success('提交成功') : message.error(response.msg);
    },
    *delete({ payload, callback }, { call }) {
      const response = yield call(fakeDelete, payload);
      response.code == 200 ? (message.success('提交成功') && callback()) : message.error(response.msg);
    },
    *update({ payload }, { call }) {
      const response = yield call(fakeUpdate, payload);
      response.code == 200 ? message.success('提交成功') : message.error(response.msg);
    },
    *find({ payload, callback }, { call }) {
      const response = yield call(fakeFind, payload);
      response.code == 200 ? callback(response) : message.error(response.msg);
    },
    *findMenus({ payload, callback }, { call }) {
      const response = yield call(fakeMenus, payload);
      response.code == 200 ? callback(response) : message.error(response.msg);
    },
    *upmenus({ payload }, { call }) {
      const response = yield call(fakeUpdateMenus, payload);
      response.code == 200 ? message.success('提交成功') : message.error(response.msg);
    },
    *findbyRoleid({ payload, callback }, { call }) {
      const response = yield call(fakeGetRoleId, payload);
      response.code == 200 ? callback(response) : message.error(response.msg);
    },
  },
};
export default Model;
