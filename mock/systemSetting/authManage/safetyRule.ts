/*
 * @Description: 系统设置-权限管理-账号安全规则
 * @Autor: zwy
 * @Date: 2022-02-15 10:20:44
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 17:07:57
 */
import { success } from '../../_util';
import { MockMethod } from 'vite-plugin-mock';

const safetyDetail = {
  id: 288,
  name: '多设备限制ip',
  describe: '多设备限制ip',
  equipment_type: 1,
  ip_type: 2,
  ip: '192.168.2.2\n195.168.3.3',
  status: 1,
  created: '2021-12-14 14:37:53',
  modified: '2022-02-10 16:29:38',
};

const ruleList = {
  total: 4,
  page: 1,
  page_size: 20,
  list: [
    {
      id: 288,
      customer_name: 'ysszdh052601',
      name: '多设备限制ip',
      describe: '多设备限制ip',
      equipment_type: 1,
      ip_type: 2,
      ip: '192.168.2.2\n195.168.3.3',
      status: 1,
      created: '2021-12-14 14:37:53',
      modified: '2022-02-10 16:29:38',
    },
    {
      id: 287,
      customer_name: 'ysszdh052601',
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
      id: 286,
      customer_name: 'zdh052601',
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
      id: 285,
      customer_name: 'yyyyzwy',
      name: 'test',
      describe: '',
      equipment_type: 1,
      ip_type: 1,
      ip: '',
      status: 1,
      created: '2021-12-06 17:06:02',
      modified: '2022-02-10 16:29:16',
    },
  ],
};

const allRules = {
  total: 4,
  list: [
    {
      id: 285,
      customer_id: 22100,
      group_id: 22100,
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
      customer_id: 22159,
      group_id: 22100,
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
      customer_id: 22161,
      group_id: 22100,
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
      customer_id: 22161,
      group_id: 22100,
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
    url: '/zdh-svc/api/member/safety/rule/addition',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/safety/rule/modification',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/safety/rule/deletion?id=mock',
    method: 'delete',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/safety/rule/fetch',
    method: 'get',
    response: () => {
      return success(safetyDetail);
    },
  },
  {
    url: '/zdh-svc/api/member/safety/rule/page',
    method: 'post',
    response: () => {
      return success(ruleList);
    },
  },
  {
    url: '/zdh-svc/api/member/safety/rule/list',
    method: 'get',
    response: () => {
      return success(allRules);
    },
  },
] as MockMethod[];
