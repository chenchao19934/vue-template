/*
 * @Description: 权限管理-数据模型
 * @Autor: zwy
 * @Date: 2022-02-15 17:10:18
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-15 17:28:41
 */
// 角色相关数据模型
export interface Role {
  id: number;
  name: string;
  description?: string | number;
  group_id?: number;
  platform?: number;
  status?: number;
  created?: string;
  modified?: string;
  // 角色可用权限给详情接口用
  member_rule_id_list?: number[];
  // 角色可用权限添加的时候使用
  rule_ids: number[];
}
