/*
 * @Description: 系统设置-账号管理-账号安全设置
 * @Autor: zwy
 * @Date: 2022-02-15 10:21:14
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 13:56:39
 */
import { http } from '/@/utils/http/axios';
import { UpdatePasswordModel } from './model/accountSetModel';

//获取安全信息
export const getAccountSafetySetInfoApi = () => {
  return http.get({
    url: '/api/member/management/safety_info',
  });
};

//module:1. 绑定邮箱 2. 修改绑定
//type:. 手机号验证  2. 邮箱验证
//code:验证码
export const bindEmailApi = (data: {
  module: number;
  type: number;
  code: string;
  email: string;
}) => {
  return http.post({
    url: '/api/member/management/bind_email',
    data,
  });
};

//1. 绑定邮箱  2. 邮箱修改手机号
export const getEmailCodeApi = (data: { module: number; email: string }) => {
  return http.post({
    url: '/api/member/management/send/email_code',
    data,
  });
};

//获取手机验证码 1. 绑定手机  5. 手机绑定邮箱  6. 手机修改邮箱
export const getSmsCodeApi = (data: { module: number; mobile: string }) => {
  return http.post({
    url: '/api/member/management/send/sms_code',
    data: { module: data.module, mobile: data.mobile },
  });
};

//1. 手机号验证码  2. 邮箱验证码
export const verifyCodeApi = (data: { type: number; code: string }) => {
  return http.post({
    url: '/api/member/management/code_verify',
    data,
  });
};

//重设在线时间
export const resetOnLineTimeApi = (hours: number) => {
  return http.post({
    url: '/api/member/management/reset_online_time',
    data: { hours },
  });
};

//重设密码
export const resetPasswordApi = (userInfo: UpdatePasswordModel) => {
  return http.post({
    url: '/api/member/management/reset_password',
    data: { old_password: userInfo.old_password, new_password: userInfo.new_password, platform: 8 },
  });
};

//绑定手机号
//module:1. 绑定手机号 2. 修改绑定
//type:. 手机号验证  2. 邮箱验证
//code:验证码
//mobile
export const bindMobileApi = (data: {
  module: number;
  type: number;
  code: string;
  mobile: string;
}) => {
  return http.post({
    url: '/api/member/management/bind_mobile',
    data,
  });
};
