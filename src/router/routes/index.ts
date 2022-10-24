/*
 * @Description:
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 11:44:26
 */
const mainLayout = () => import('/@/layouts/mainLayout.vue');

// 白名单路由，不需要权限
export const whiteRoutes = [
  {
    path: '/login',
    name: Symbol(),
    component: () => import('/@/views/login/index.vue'),
    meta: { title: '登录' },
  },
];

// 固定路由(eg:首页)
export const constantRoutes = [
  {
    path: '/',
    name: Symbol(),
    redirect: '/index',
    component: mainLayout,
    children: [
      {
        path: 'index',
        name: Symbol(),
        component: () => import('/@/views/home/index.vue'),
        meta: { path: 'index', id: -1, title: '首页', sort: 0 },
      },
    ],
  },
  //测试
  // {
  //   path: '/',
  //   name: Symbol(),
  //   component: mainLayout,
  //   children: [
  //     {
  //       path: 'systemSetting/system/menuManage',
  //       name: Symbol(),
  //       component: () => import('/@/views/systemSetting/system/menuManage/index.vue'),
  //       meta: {
  //         btnPermissions: ['add', 'edit', 'delete'],
  //       },
  //     },
  //   ],
  // },
];

export const routes = [...constantRoutes, ...whiteRoutes];
