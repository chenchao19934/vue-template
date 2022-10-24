import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { routes, whiteRoutes } from './routes/index';
import { userStoreWithOut } from '../store/modules/user';
import { addRoutes } from './help';

const whiteList: string[] = [];
whiteRoutes.forEach((route) => {
  whiteList.push(route.path);
});

NProgress.configure({
  showSpinner: false,
});

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, _from, next) => {
  NProgress.start();
  const userStore = userStoreWithOut();
  const { token, isGlobalInfoLoaded, getUserInfo, getPermissions } = userStore;
  if (token) {
    if (!isGlobalInfoLoaded) {
      await Promise.all([getUserInfo(), getPermissions()]);
      userStore.isGlobalInfoLoaded = true;
      addRoutes(userStore.permissions);
      next({ ...to, replace: true });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
    }
  }

  document.title = to.meta.title || '';
});

router.afterEach(() => {
  NProgress.done();
});
