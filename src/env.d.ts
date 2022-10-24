/*
 * @Description:
 * @Autor: zwy
 * @Date: 2021-12-28 17:31:24
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-19 21:04:10
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
