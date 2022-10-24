/*
 * @Description: 系统设置-权限管理-角色权限
 * @Autor: zwy
 * @Date: 2022-02-15 10:20:29
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 10:38:42
 */
import { http } from '/@/utils/http/axios';
import { Role } from './model/roleListModel';
import { BasicPageParams } from '/@/api/others/model/commonModel';

// 查询角色
export type QueryRolesParams = {
  name?: string;
} & BasicPageParams;

export const getRoleListApi = (data: QueryRolesParams) => {
  return http.post({
    url: '/api/member/role/page',
    params: data,
  });
};

// 添加角色
type addRoleParams = {} & Role;
export const addRoleApi = (data: addRoleParams) => {
  return http.post({
    url: '/api/member/role/addition',
    data: data,
  });
};

// 更新角色
type updateRoleParams = {} & Role;
export const updateRoleApi = (data: updateRoleParams) => {
  return http.post({
    url: `/api/member/role/modification`,
    data: data,
  });
};

// 删除角色
export const deleteRoleApi = (id: number) => {
  return http.delete({
    url: `/api/member/role/deletion?id=${id}`,
  });
};

// 角色详情
export const getRoleDetailApi = (id: number) => {
  return http.get({
    url: `/api/member/role/fetch?id=${id}`,
  });
};

// 获取所有角色
export const getAllRolesApi = () => {
  return http.get({
    url: '/api/member/ucp/role/list',
  });
};

export const getRoleMenuApi = () => {
  return http.get({
    url: '/api/member/ucp/menu',
  });
};
