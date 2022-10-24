/*
 * @Description: 系统设置-账号管理-我的账号
 * @Autor: zwy
 * @Date: 2022-02-15 10:21:30
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-15 17:03:41
 */
import { http } from '/@/utils/http/axios';

//删除常用登录地区
export const deleteLoginLocationApi = (data: {
  customer_id: number | undefined;
  login_location: string;
}) => {
  return http.post({
    url: '/api/member/sub/account/login_location_deletion',
    data,
  });
};
