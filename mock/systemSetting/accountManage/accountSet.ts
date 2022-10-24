/*
 * @Description: 系统设置-账号管理-账号安全设置
 * @Autor: zwy
 * @Date: 2022-02-15 10:21:14
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 16:37:20
 */
import { success } from '../../_util';
import { MockMethod } from 'vite-plugin-mock';

const safetyInfo = {
  mobile: '15959110377',
  email: '945320646@qq.com',
  safety_rule_id: 0,
  password_level: 2,
  password_uptime: '2022-02-17 10:04:06',
  days: '1',
  online_hours: 4,
  rules: [
    {
      id: 285,
      name: 'test',
      describe: '',
      equipment_type: 1,
      ip_type: 1,
      ip: '',
      status: 1,
      created: '2021-12-06 17:06:02',
      modified: '2022-02-10 16:29:16',
    },
    {
      id: 286,
      name: 'yss',
      describe: '多设备不限ip',
      equipment_type: 1,
      ip_type: 1,
      ip: '',
      status: 1,
      created: '2021-12-14 10:46:32',
      modified: '2022-02-10 16:29:30',
    },
    {
      id: 287,
      name: '单设备不限ip',
      describe: '单设备不限ip',
      equipment_type: 2,
      ip_type: 1,
      ip: '',
      status: 1,
      created: '2021-12-14 14:36:37',
      modified: '2021-12-14 14:36:37',
    },
    {
      id: 288,
      name: '多设备限制ip',
      describe: '多设备限制ip',
      equipment_type: 1,
      ip_type: 2,
      ip: '192.168.2.2\n195.168.3.3',
      status: 1,
      created: '2021-12-14 14:37:53',
      modified: '2022-02-10 16:29:38',
    },
  ],
};

export default [
  {
    url: '/zdh-svc/api/member/management/safety_info',
    method: 'get',
    response: () => {
      return success(safetyInfo);
    },
  },

  {
    url: '/zdh-svc/api/member/management/bind_email',
    method: 'post',
    response: () => {
      return success();
    },
  },

  {
    url: '/zdh-svc/api/member/management/send/email_code',
    method: 'post',
    response: () => {
      return success();
    },
  },

  {
    url: '/zdh-svc/api/member/management/send/sms_code',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/management/code_verify',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/management/reset_online_time',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/management/reset_password',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/management/bind_mobile',
    method: 'post',
    response: () => {
      return success();
    },
  },
] as MockMethod[];
