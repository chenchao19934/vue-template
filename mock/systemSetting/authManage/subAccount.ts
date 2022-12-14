/*
 * @Description: 系统设置-权限管理-子账号列表
 * @Autor: zwy
 * @Date: 2022-02-15 10:20:53
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 17:08:22
 */
import { success } from '../../_util';
import { MockMethod } from 'vite-plugin-mock';

const accountDetail = {
  id: 22550,
  code: 22021782586,
  username: 'bbbbb',
  realname: 'bb',
  mobile: '',
  level: 1,
  status: 1,
  created: '2022-02-17 17:42:09',
  role_ids: [31],
  role_name: '超级',
  login_locations: [],
  lock: 0,
  position: 0,
  safety_rule_id: 285,
  safety_rule_name: 'test',
  admin_user_id: 22100,
  modified: '2022-02-17 18:24:16',
};

const accountList = {
  total: 19,
  page: 1,
  page_size: 20,
  list: [
    {
      id: 22550,
      code: 22021782586,
      username: 'bbbbb',
      realname: 'bb',
      mobile: '',
      level: 1,
      status: 1,
      created: '2022-02-17 17:42:09',
      role_ids: [31],
      role_name: '超级',
      login_locations: [],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2022-02-17 18:24:16',
    },
    {
      id: 22530,
      code: 22021514709,
      username: 'chenjy',
      realname: 'chenjy',
      mobile: '',
      level: 1,
      status: 1,
      created: '2022-02-15 13:45:23',
      last_login_time: '2022-02-15 13:46:11',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2022-02-15 13:47:04',
    },
    {
      id: 22527,
      code: 22021422969,
      username: 'ccccc',
      realname: 'ccccc',
      mobile: '',
      level: 1,
      status: 1,
      created: '2022-02-14 16:22:37',
      last_login_time: '2022-02-14 16:23:01',
      role_ids: [31],
      role_name: '超级',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2022-02-17 16:24:50',
    },
    {
      id: 22519,
      code: 22021042566,
      username: 'zqzdh001',
      realname: '1',
      mobile: '',
      level: 1,
      status: 1,
      created: '2022-02-10 16:28:46',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: [],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22160,
      modified: '2022-02-10 16:28:46',
    },
    {
      id: 22518,
      code: 22021016925,
      username: 'zqzdh01',
      realname: '111',
      mobile: '15878955484',
      level: 1,
      status: 1,
      created: '2022-02-10 14:41:29',
      last_login_time: '2022-02-10 15:19:50',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2022-02-10 15:20:06',
    },
    {
      id: 22512,
      code: 22012769224,
      username: 'wwwwwzwy',
      realname: 'ww',
      mobile: '',
      level: 1,
      status: 1,
      created: '2022-01-27 16:12:30',
      last_login_time: '2022-01-27 16:38:41',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 1,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2022-01-27 16:41:36',
    },
    {
      id: 22208,
      code: 21123166231,
      username: 'yyyyy',
      realname: 'yyyyy',
      mobile: '',
      level: 1,
      status: 1,
      created: '2021-12-31 11:35:42',
      last_login_time: '2022-01-28 15:26:50',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2022-02-09 00:09:42',
    },
    {
      id: 22205,
      code: 21123013335,
      username: 'meina',
      realname: 'qq',
      mobile: '',
      level: 1,
      status: 1,
      created: '2021-12-30 11:30:52',
      last_login_time: '2022-01-05 15:40:51',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: [],
      lock: 0,
      position: 0,
      safety_rule_id: 286,
      safety_rule_name: 'yss',
      admin_user_id: 22100,
      modified: '2022-01-05 15:40:51',
    },
    {
      id: 22168,
      code: 21121435391,
      username: 'zdh111',
      realname: '1111',
      mobile: '',
      level: 1,
      status: 1,
      created: '2021-12-14 17:26:32',
      last_login_time: '2022-02-15 09:08:26',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 0,
      safety_rule_id: 286,
      safety_rule_name: 'yss',
      admin_user_id: 22160,
      modified: '2022-02-15 09:08:26',
    },
    {
      id: 22166,
      code: 21121483502,
      username: 'zdh052603',
      realname: '指点荟3',
      mobile: '',
      level: 1,
      status: 1,
      created: '2021-12-14 16:59:45',
      role_ids: [52],
      role_name: 'yss',
      login_locations: [],
      lock: 0,
      position: 0,
      safety_rule_id: 286,
      safety_rule_name: 'yss',
      admin_user_id: 22111,
      modified: '2021-12-14 16:59:45',
    },
    {
      id: 22164,
      code: 21121447660,
      username: 'zdh052602',
      realname: '指点荟2',
      mobile: '',
      level: 1,
      status: -1,
      created: '2021-12-14 16:52:18',
      last_login_time: '2021-12-14 16:57:47',
      role_ids: [52],
      role_name: 'yss',
      login_locations: [],
      lock: 0,
      position: 0,
      safety_rule_id: 286,
      safety_rule_name: 'yss',
      admin_user_id: 22157,
      modified: '2021-12-14 16:58:04',
    },
    {
      id: 22163,
      code: 21121441770,
      username: '2324e',
      realname: 'ferth',
      mobile: '',
      level: 1,
      status: 1,
      created: '2021-12-14 14:20:29',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: [],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22111,
      modified: '2021-12-14 14:20:29',
    },
    {
      id: 22162,
      code: 21121451669,
      username: '12345r',
      realname: 'frterf',
      mobile: '',
      level: 1,
      status: 1,
      created: '2021-12-14 14:18:24',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: [],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22111,
      modified: '2021-12-14 14:18:24',
    },
    {
      id: 22161,
      code: 21121450442,
      username: 'ysszdh052601',
      realname: 'yss1',
      mobile: '',
      level: 1,
      status: 1,
      created: '2021-12-14 10:49:40',
      last_login_time: '2021-12-14 14:37:25',
      role_ids: [52],
      role_name: 'yss',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 2,
      safety_rule_id: 288,
      safety_rule_name: '多设备限制ip',
      admin_user_id: 22100,
      modified: '2021-12-14 14:38:14',
    },
    {
      id: 22160,
      code: 21121498740,
      username: 'zqzdh',
      realname: 'zq',
      mobile: '18843059666',
      level: 1,
      status: 1,
      created: '2021-12-14 10:38:43',
      last_login_time: '2022-02-15 10:03:09',
      role_ids: [31],
      role_name: '超级',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2022-02-15 10:03:09',
    },
    {
      id: 22159,
      code: 21121438871,
      username: 'zdh052601',
      realname: '杨',
      mobile: '15060757166',
      level: 1,
      status: 1,
      created: '2021-12-14 09:47:50',
      last_login_time: '2021-12-28 15:06:03',
      role_ids: [52],
      role_name: 'yss',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 1,
      safety_rule_id: 286,
      safety_rule_name: 'yss',
      admin_user_id: 22111,
      modified: '2021-12-28 15:06:03',
    },
    {
      id: 22111,
      code: 21120713026,
      username: '44444',
      realname: '555',
      mobile: '15959110370',
      level: 1,
      status: 1,
      created: '2021-12-07 15:07:37',
      last_login_time: '2022-02-18 10:19:34',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: ['本地局域网'],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2022-02-18 10:19:34',
    },
    {
      id: 22104,
      code: 21120683502,
      username: 'yy123',
      realname: 'yy',
      mobile: '',
      level: 1,
      status: 1,
      created: '2021-12-06 17:08:58',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: [],
      lock: 0,
      position: 1,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2021-12-14 11:42:31',
    },
    {
      id: 22103,
      code: 21120678058,
      username: 'zhangwenyu1',
      realname: '张文裕',
      mobile: '',
      level: 1,
      status: 1,
      created: '2021-12-06 17:07:39',
      role_ids: [30],
      role_name: '普通用户',
      login_locations: [],
      lock: 0,
      position: 0,
      safety_rule_id: 285,
      safety_rule_name: 'test',
      admin_user_id: 22100,
      modified: '2021-12-06 17:24:27',
    },
  ],
};

export default [
  {
    url: '/zdh-svc/api/member/sub/account/login_location_deletion',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/sub/account/role/batch_modification',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/sub/account/safety/rule/batch_modification',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/sub/account/info',
    method: 'get',
    response: () => {
      return success(accountDetail);
    },
  },
  {
    url: '/zdh-svc/api/member/sub/account/insertion',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/sub/account/modification',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/sub/account/password/modification',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/sub/account/page',
    method: 'post',
    response: () => {
      return success(accountList);
    },
  },
  {
    url: '/zdh-svc/api/member/sub/account/unlock',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/sub/account/batch_open',
    method: 'post',
    response: () => {
      return success();
    },
  },
] as MockMethod[];
