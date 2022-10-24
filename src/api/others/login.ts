/*
 * @Description: 登录相关请求
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 13:49:57
 */
import { http } from '/@/utils/http/axios';
import { LoginParams } from './model/loginModel';

//登录
export const loginApi = (params: LoginParams) => {
  return http.post({ url: '/api/member/uct/login', params });
};

//登出
export const logoutApi = () => {
  return http.post({ url: '/api/member/ucp/logout' }, { needLoading: true });
};

//获取权限列表
export const getPermissionsApi = () => {
  return http.get({ url: '/api/member/ucp/menu/permissions' });
};

//获取用户信息
export const getUserInfoApi = () => {
  return http.get({ url: '/api/member/management/account_info' });
};
