/*
 * @Description: 权限管理-数据模型
 * @Autor: zwy
 * @Date: 2022-02-15 17:10:18
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-15 17:28:41
 */

// 安全规则数据模型
export interface SafetyRule {
  id?: number;
  customer_id?: number;
  group_id?: number;
  name: string;
  describe: string;
  // 1 多设备登录 2 单设备登录
  equipment_type: number | undefined;
  // 1 不限IP 2 仅限IP白名单
  ip_type: number | undefined;
  ip?: string;
  status?: number;
  created?: string;
  modified?: string;
}
