/*
 * @Description: 系统设置-系统管理-用户列表
 * @Autor: zwy
 * @Date: 2022-02-16 09:45:24
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 17:08:51
 */
import { success } from '../../_util';
import { MockMethod } from 'vite-plugin-mock';

const logList = {
  total: 41,
  page: 1,
  page_size: 5,
  list: [
    {
      id: 4575,
      ip: '192.168.3.83',
      location: '本地局域网',
      os: 'Mac OS X',
      browser: 'Chrome 9',
      module: 9,
      response_data: '登录成功',
      status: 1,
      login_method: 1,
      created: '2022-02-10 17:06:24',
      modified: '2022-02-10 17:06:24',
    },
    {
      id: 3321,
      ip: '192.168.3.83',
      location: '本地局域网',
      os: 'Mac OS X',
      browser: 'Chrome 9',
      module: 9,
      response_data: '登录成功',
      status: 1,
      created: '2021-12-31 15:27:11',
      modified: '2021-12-31 15:27:11',
    },
    {
      id: 3274,
      ip: '192.168.3.83',
      location: '本地局域网',
      os: 'Mac OS X',
      browser: 'Chrome 9',
      module: 9,
      response_data: '登录成功',
      status: 1,
      created: '2021-12-31 14:17:32',
      modified: '2021-12-31 14:17:32',
    },
    {
      id: 3269,
      ip: '192.168.3.83',
      location: '本地局域网',
      os: 'Mac OS X',
      browser: 'Chrome 9',
      module: 9,
      response_data: '登录成功',
      status: 1,
      created: '2021-12-31 13:58:35',
      modified: '2021-12-31 13:58:35',
    },
    {
      id: 3259,
      ip: '192.168.3.83',
      location: '本地局域网',
      os: 'Mac OS X',
      browser: 'Chrome 9',
      module: 9,
      response_data: '登录成功',
      status: 1,
      created: '2021-12-31 11:12:53',
      modified: '2021-12-31 11:12:53',
    },
  ],
};

const userList = {
  total: 4,
  page: 1,
  page_size: 1,
  list: [
    {
      id: 22157,
      username: '15877482301',
      realname: '15877482300',
      level: 9,
      status: 1,
      created: '2021-12-08 18:06:31',
      last_login_time: '2022-02-10 17:06:24',
      admin_user_id: 22100,
      modified: '2022-02-10 17:06:24',
    },
    {
      id: 22100,
      username: 'yyyyzwy',
      realname: 'yyyyzwy',
      level: 9,
      status: 1,
      created: '2021-12-06 10:21:39',
      last_login_time: '2022-02-18 14:37:56',
      admin_user_id: 22100,
      modified: '2022-02-18 14:37:56',
    },
    {
      id: 22094,
      username: '15959110376',
      realname: '15959110376',
      level: 9,
      status: 1,
      created: '2021-11-26 14:56:25',
      last_login_time: '2021-12-16 11:22:37',
      admin_user_id: 0,
      modified: '2021-12-16 11:22:37',
    },
    {
      id: 11650,
      username: '15705929000',
      realname: '15705929000',
      level: 9,
      status: 1,
      created: '2021-10-18 15:08:30',
      last_login_time: '2021-12-27 16:42:33',
      admin_user_id: 98,
      modified: '2021-12-27 16:42:33',
    },
  ],
};

export default [
  {
    url: '/zdh-svc/api/member/login/log/page',
    method: 'post',
    response: () => {
      return success(logList);
    },
  },
  {
    url: '/zdh-svc/api/member/admin/customer/modification',
    method: 'post',
    response: () => {
      return success();
    },
  },
  {
    url: '/zdh-svc/api/member/admin/customer/page',
    method: 'post',
    response: () => {
      return success(userList);
    },
  },
  {
    url: '/zdh-svc/api/member/admin/customer/subcustomer/deletion',
    method: 'post',
    response: () => {
      return success();
    },
  },
] as MockMethod[];
