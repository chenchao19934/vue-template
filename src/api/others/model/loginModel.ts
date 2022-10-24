/*
 * @Description: 登录数据模型
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 14:11:30
 */

// 阿里验证码
interface Acs {
  sessionid: string;
  token: string;
  sig: string;
  scene: string;
}
// 登录参数
export interface LoginParams {
  username: string;
  password: string;
  platform: number;
  acs: Acs;
}
