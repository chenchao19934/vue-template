/*
 * @Description:
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 11:58:49
 */
import { RouteRecordRaw } from 'vue-router';
import { router } from '.';
import { Permission } from '/@/api/others/model/userModel';
import { routes } from './routes';

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

export const addRoutes = (permissions: Permission[]) => {
  dynamicViewsModules = import.meta.glob('../views/**/*.vue');
  resetRouter();
  const mainLayout = () => import('/@/layouts/mainLayout.vue');
  permissions.forEach((element) => {
    const { id, component, path, title, icon, is_blank, is_hidden, is_path, pid } = element;
    if (component) {
      const route = {
        path: '/',
        name: Symbol(),
        component: mainLayout,
        children: [
          {
            path: path,
            name: Symbol(),
            component: dynamicImport(dynamicViewsModules, component as string),
            meta: { title, icon, id, is_blank, is_hidden, is_path, path, pid },
          },
        ],
      };

      const btnPermissions: string[] = [];
      permissions.forEach((element) => {
        const { pid, permission } = element;
        if (pid === id) {
          btnPermissions.push(permission);
        }
      });
      // @ts-ignore
      route.children[0].meta.btnPermissions = btnPermissions;
      router.addRoute(route as unknown as RouteRecordRaw);
    }
  });
};

export const resetRouter = () => {
  // 重置路由，清空
  router.getRoutes().forEach((route) => {
    const { name } = route;
    router.removeRoute(name as string);
  });
  // 固定路由加回
  routes.forEach((route) => {
    router.addRoute(route);
  });
  // 404页面单独add，不然刷新页面会匹配到404
  const exception404 = {
    path: '/:pathMatch(.*)*',
    name: Symbol(),
    component: () => import('/@/views/exception/exception404.vue'),
  };
  router.addRoute(exception404);
};

//  component:(eg:/menu/MenuPermission.vue,/menu/MenuPermission,menu/MenuPermission.vue。。。等都是符合的)
function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    console.log('请不要在相同层次src/views文件夹下创建相同文件名的.vue文件。这将导致动态引入失败');
    return;
  } else {
    console.log(`在src/views/下找不到${component}.vue的文件 , 请自行创建!`);
    return;
  }
}
