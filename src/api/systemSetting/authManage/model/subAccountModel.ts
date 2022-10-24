/*
 * @Description: 权限管理-子账号相关数据模型
 * @Autor: zwy
 * @Date: 2022-02-15 17:10:18
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-15 17:28:41
 */
export interface SubAccount {
  id?: number;
  code?: number;
  group_id?: number;
  username: string;
  realname?: string;
  password?: string;
  repeat_password?: string;
  mobile?: string;
  level?: number;
  status?: number;
  created?: string;
  last_login_time?: string;
  role_ids?: number[] | number | undefined;
  role_name?: string;
  login_locations?: string[];
  lock?: number;
  position?: number;
  safety_rule_id?: number;
  safety_rule_name?: string;
}
