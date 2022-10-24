/*
 * @Description: 系统设置-账号管理-我的账号
 * @Autor: zwy
 * @Date: 2022-02-15 10:21:30
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 16:58:13
 */
import { success } from '../../_util';
import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/zdh-svc/api/member/sub/account/login_location_deletion',
    method: 'post',
    response: () => {
      return success();
    },
  },
] as MockMethod[];
