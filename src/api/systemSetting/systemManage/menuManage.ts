/*
 * @Description: 系统设置-系统管理-菜单管理
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-14 14:59:20
 */
import { http } from '/@/utils/http/axios';
import { Menu } from '/@/api/others/model/menuModel';

// 获取菜单列表
export const getMenusApi = () => {
  return http.get({ url: '/api/member/rule/list' });
};

// 添加菜单
export const addMenuApi = (data: Menu) => {
  return http.post({
    url: '/api/member/rule/addition',
    data,
  });
};

// 修改菜单
export const editMenuApi = (data: Menu) => {
  return http.post({
    url: '/api/member/rule/modification',
    data,
  });
};

// 菜单详情
export const getMenuDetailApi = (id: number) => {
  return http.get({
    url: `/api/member/rule/fetch?id=${id}`,
  });
};

// 删除菜单
export const deleteMenuApi = (id: number) => {
  return http.delete({
    url: `/api/member/rule/deletion?id=${id}`,
  });
};
