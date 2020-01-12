import { queryCurrent, query as queryUsers } from '@/services/user';
import { notification } from 'antd';
import { getAuthority,setBtnAuthority } from '@/utils/authority';

const renderTreeNodes = (data, v) => {
  let c = {
    path: v.authurl,
    name: v.name,
    icon: v.icon,
    children: []
  }
  data.filter(f => f.parent_id == v.id && f.isbtn == 0).map(item => {
    c.children.push(renderTreeNodes(data, item))
  })
  return c
}

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      //登录验证
      var menuData = [];
      const islogin = !(getAuthority() === '')
      if (islogin) {
        const response = yield call(queryCurrent);
        if (response.code != 200) {
          notification.error({
            message: `获取权限失败`,
          })
        } else {
          setBtnAuthority(response.data)
          response.data.filter(f => f.parent_id == 0 && f.isbtn == 0).map(item => {
            menuData.push(renderTreeNodes(response.data, item))
          })
        }
      }
      yield put({
        type: 'saveCurrentUser',
        payload: {
          islogin: islogin,
          menuData: menuData,
        }
      });
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...state, currentUser: {
          islogin: payload.islogin,
          menuData: payload.menuData
        }
      };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
