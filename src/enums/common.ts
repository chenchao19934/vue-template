/*
 * @Description:
 * @Autor: zwy
 * @Date: 2022-02-15 14:03:26
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-15 14:05:34
 */
export const PasswordLevelObj: { [key: number]: string } = {
  1: '弱',
  2: '中',
  3: '强',
};
export const PasswordLevel: { [key: number]: PasswordLevelType } = {
  0: 'info',
  1: 'danger',
  2: 'warning',
  3: 'success',
};
export type PasswordLevelType = 'warning' | 'info' | 'danger' | 'success';

export const SafeRuleEquipType: { [key: number]: string } = {
  1: '多设备登录',
  2: '单设备登录',
};
export const SafeRuleIPType: { [key: number]: string } = {
  1: '不限IP',
  2: '仅限IP白名单',
};
