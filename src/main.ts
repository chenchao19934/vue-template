/*
 * @Description:
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-19 20:56:37
 */
import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import 'virtual:svg-icons-register';
import './assets/css/common.scss';
import IconFont from './assets/iconFont/index';
import { router } from './router/index';
import { pinia } from './store/index';
import { i18n } from './i18n/index';
import permission from './directives/permission';
import mitt from './utils/mitt';

const app = createApp(App);
app.component('IconFont', IconFont);
app.use(router);
app.use(pinia);
app.use(i18n);
app.directive('permission', permission);
app.config.globalProperties.$bus = mitt();
app.mount('#app');
