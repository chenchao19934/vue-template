/*
 * @Description: 系统设置-系统管理-用户列表
 * @Autor: zwy
 * @Date: 2022-02-16 09:45:24
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 17:38:32
 */
import { http } from '/@/utils/http/axios';
import { BasicPageParams } from '/@/api/others/model/commonModel';
import { QyeryAccountParams } from './model/userListModel';

// 获取登录日志
export const getLoginLogApi = (data: { customer_id: number } & BasicPageParams) => {
  return http.post({
    url: '/api/member/login/log/page',
    data: data,
  });
};

// 编辑
export const updateAccountApi = (data: {
  customer_id: number;
  realname: string;
  status: number;
  level: number;
}) => {
  return http.post({
    url: '/api/member/admin/customer/modification',
    data,
  });
};

export const getUserListApi = (data: QyeryAccountParams & BasicPageParams) => {
  return http.post({
    url: '/api/member/admin/customer/page',
    params: data,
  });
};

// 删除账号
export const deleteUserApi = (data: { customer_id: number }) => {
  return http.post({
    url: '/api/member/admin/customer/subcustomer/deletion',
    data: data,
  });
};
