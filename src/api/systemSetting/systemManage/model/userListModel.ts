/*
 * @Description: 系统配置-用户列表的用户数据模型
 * @Autor: zwy
 * @Date: 2022-02-16 09:59:03
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 10:10:15
 */

export interface Account {
  id?: number;
  username?: string;
  realname?: string;
  level?: number;
  master_customer_id?: number;
  master_user_name?: string;
  status?: number;
  created?: string;
  last_login_time?: string;
}

// 列表分页
export type QyeryAccountParams = {
  username: string;
  /** status：0禁用  1启用 不传值是全部*/
  status: number | string;
  /** 1是子账户  9是主账户 */
  level: number;
};
