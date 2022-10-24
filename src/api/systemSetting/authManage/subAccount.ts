/*
 * @Description: 系统设置-权限管理-子账号列表
 * @Autor: zwy
 * @Date: 2022-02-15 10:20:53
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 09:46:10
 */
import { http } from '/@/utils/http/axios';
import { BasicPageParams } from '/@/api/others/model/commonModel';

// 删除常用登录区域
export const deleteLoginLocationApi = (data: { customer_id: number; login_location: string }) => {
  return http.post({
    url: '/api/member/sub/account/login_location_deletion',
    data,
  });
};

// 批量修改角色
export const batchEditRoleApi = (data: { role_ids: number[]; customer_ids: number[] }) => {
  return http.post({
    url: '/api/member/sub/account/role/batch_modification',
    data,
  });
};

// 批量修改安全规则
export const batchEditSafetyRuleApi = (data: {
  safety_rule_id: number | undefined;
  customer_ids: number[];
}) => {
  return http.post({
    url: '/api/member/sub/account/safety/rule/batch_modification',
    data,
  });
};

// 详情
export const getSubAccountDetailApi = (id: number) => {
  return http.get({
    url: `/api/member/sub/account/info?customer_id=${id}`,
  });
};

// 添加
export const addSubAccountApi = (data) => {
  return http.post({
    url: '/api/member/sub/account/insertion',
    data: data,
  });
};
// 更新
export const updateSubAccountApi = (data) => {
  return http.post({
    url: `/api/member/sub/account/modification`,
    data: data,
  });
};

// 修改密码
export const updateSubAccountPwdApi = (data: { customer_id: number; password: string }) => {
  return http.post({
    url: '/api/member/sub/account/password/modification',
    data,
  });
};

// 列表分页
type QuerySubAccountParams = {
  username: string;
  role_ids: number[];
  order_by: string;
} & BasicPageParams;

export const getSubAccountListApi = (data: QuerySubAccountParams) => {
  return http.post({
    url: '/api/member/sub/account/page',
    data,
  });
};

// 解除锁定
export const unlockSubAccountApi = (data: { customer_id: number }) => {
  return http.post({
    url: '/api/member/sub/account/unlock',
    data,
  });
};

// 批量启用
export const batchEnableSubAccountApi = (data: { sub_customer_id_list: number[] }) => {
  return http.post({
    url: '/api/member/sub/account/batch_open',
    data,
  });
};
