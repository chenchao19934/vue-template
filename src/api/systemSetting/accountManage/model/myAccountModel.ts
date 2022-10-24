/*
 * @Description: 账号管理-数据模型
 * @Autor: zwy
 * @Date: 2022-02-15 10:36:36
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 13:57:01
 */

export interface SafeRuleModel {
  id: number;
  group_id: number;
  customer_id: number;
  name: string;
  describe: string;
  equipment_type: number;
  ip_type: number;
  ip: string;
  status: number;
  created: string;
  modified: string;
}

export interface SafetyInfoModel {
  group_id: number;
  customer_id: number;
  mobile: string;
  email: string;
  safety_rule_id: number;
  password_level: number;
  password_uptime: string;
  days: string;
  online_hours: number;
  hasRule: boolean;
  rules: Array<SafeRuleModel>;
}

export interface ListItemType {
  type?: string;
  top?: string;
  bottom?: string;
  bottomPopContent?: string;
  right?: string;
}
