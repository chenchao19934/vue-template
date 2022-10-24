/*
 * @Description: 菜单数据模型
 * @Autor: zwy
 * @Date: 2021-11-29 16:32:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 10:45:33
 */
// import { Result } from '#/axios';

export interface UserInfoModel {
  id?: number;
  code?: number;
  group_id: number;
  avatar?: string;
  username?: string;
  mobile?: string;
  email?: string;
  level?: number;
  is_private?: number;
  is_verification?: number;
  verify_type?: number;
  status?: number;
  realname?: string;
  created?: string | null;
  last_login_time?: string | null;
  locations?: Array<string>;
  keep_alive?: number;
}
// export type UserInfoModelResult = Result<UserInfoModel>;
//菜单数据
export interface MenuModel {
  component?: string | null; //组件
  id: number; //菜单Id
  is_blank?: number;
  is_hidden?: number; //1和-1
  is_path?: number;
  path: string | null;
  permission?: string | null;
  pid?: number; //父级id,0表示没有父级，为1级菜单
  sort: number; //排序
  title: string; //菜单名称
  type?: number;
  children?: Array<MenuModel>;
}
// export type MenuListModelResult = Result<Array<MenuModel>>;

export interface PasswordModel {
  password: string;
  new_password: string;
  confirm_password: string;
}

/**
 * @interface {object} Menu，权限相关菜单管理
 */
export interface Menu {
  id?: number;
  /**必须，父id，根目录为0*/
  pid: number;
  /**必须，标题*/
  title: string;
  /** 必须，菜单类型 1按钮 2菜单 */
  type: number;
  /** 必须，排序 */
  sort: number;
  /** 必须，是否隐藏 -1隐藏 1显示 */
  is_hidden: number;
  /** 必须，是否外链 -1不是 1是 */
  is_blank: number;
  /** 必须，是否路由：-1 否 1是*/
  is_path: number;
  /** 非必须，组件路径 */
  component?: string;
  /** 非必须，权限标识 */
  permission?: string;
  /** 非必须，API接口路由 */
  api_route?: string;
  /** 非必须，前端路由*/
  path?: string;
  /** 非必须，图标*/
  icon?: string;
  /** 非必须，提示信息*/
  tip?: string;
  /** 菜单权限 */
  is_public?: number;
  modified?: string;
  created?: string;
  status?: number;
  platform?: number;
}
