/*
 * @Description: 用户相关
 * @Autor: zwy
 * @Date: 2022-02-15 16:00:12
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 10:26:44
 */

import { MenuModel } from './menuModel';

export interface UserInfo {
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

export interface Permission {
  component: string;
  icon: string;
  id: number;
  is_blank: number;
  is_hidden: number;
  is_path: number;
  path: string;
  permission: string;
  pid: number;
  sort: number;
  tip: string;
  title: string;
  type: number;
  children?: Permission[];
}

export interface UserState {
  userInfo: Nullable<UserInfo>;
  permissions: Permission[];
  navList: MenuModel[];
  isGlobalInfoLoaded: boolean;
  token: Nullable<string>;
  onlineHour: number;
}
