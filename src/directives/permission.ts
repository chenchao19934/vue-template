/*
 * @Description: 权限指令
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 16:08:41
 */
import { router } from '/@/router/index';

export default {
  mounted(el, binding) {
    const { value } = binding;
    const roles = (
      router.currentRoute.value.meta ? router.currentRoute.value.meta.btnPermissions : []
    ) as string[];
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`);
    }
  },
};
