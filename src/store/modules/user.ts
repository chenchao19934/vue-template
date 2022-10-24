/*
 * @Description: 用户相关
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-21 16:31:41
 */
import { cloneDeep } from 'lodash-es';
import { defineStore } from 'pinia';
import { pinia } from '..';
import { getPermissionsApi, getUserInfoApi, loginApi, logoutApi } from '/@/api/others/login';
import { LoginParams } from '/@/api/others/model/loginModel';
import { UserState, UserInfo } from '/@/api//others/model/userModel';
import { MenuModel } from '/@/api/others/model/menuModel';
import { TOKEN_KEY } from '/@/enums/cacheEnum';
import { LoginEnum } from '/@/enums/loginEnum';
import { router } from '/@/router';
import { encryptByMd5 } from '/@/utils/cipher';
import { formatTree } from '/@/utils/common';
import { APP_ONLINE_HOUR } from '/@/enums/cacheEnum';

export const userStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    permissions: [],
    navList: [], //导航栏
    isGlobalInfoLoaded: false, //进入路由时用于判断是否获取了全局数据，eg：用户信息，菜单列表等
    token: localStorage.getItem(TOKEN_KEY),
    onlineHour: 0, //在线时长
  }),
  getters: {},
  actions: {
    //设置token
    setToken(token: string) {
      this.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    removeToken() {
      localStorage.removeItem(TOKEN_KEY);
    },
    // setExpiresTime(time: string) {
    //   this.ExpiresTime = token;
    //   localStorage.setItem(EXPIRES_TIME, time);
    // },
    //设置导航栏
    setNavList(navList: Array<MenuModel>) {
      const nav: Array<MenuModel> = [];
      navList.forEach((val) => {
        if (val.is_hidden != 1) {
          //这步去掉隐藏的菜单
          nav.push(val);
        }
      });
      nav.sort((a, b) => {
        return a.sort - b.sort;
      });
      //加入首页
      nav.unshift({
        path: 'index',
        id: -1,
        title: '首页',
        sort: 0,
      });
      this.navList = nav;
    },
    //移除导航栏菜单列表
    removeNavList() {
      this.navList = [];
    },
    //设置在线时长
    setOnLineHour(hour: number) {
      this.onlineHour = hour;
      localStorage.setItem(APP_ONLINE_HOUR, hour + '');
    },
    //移除权限列表
    removePermissions() {
      this.permissions = [];
    },
    //登录
    async login(formState: LoginParams) {
      const formStateRaw = cloneDeep(formState);
      formStateRaw.password = encryptByMd5(formStateRaw.password + LoginEnum.SALT);
      try {
        const { token } = await loginApi(formStateRaw);
        this.resetUser();
        this.setToken(token);
        router.replace({ path: '/' });
      } catch (error) {
        console.log(error);
        // @ts-ignore
        window.nc.reset();
        formState.acs.token = '';
        formState.acs.sig = '';
        formState.acs.sessionid = '';
      }
    },
    //登出
    async logout() {
      await Promise.all([logoutApi(), router.push({ path: '/login' })]);
      this.resetUser();
    },
    //重置用户信息
    resetUser() {
      this.userInfo = null;
      this.permissions = [];
      this.isGlobalInfoLoaded = false;
      this.setToken('');
    },
    //获取用户信息
    async getUserInfo() {
      const userInfo = await getUserInfoApi();
      this.userInfo = userInfo;
    },
    //更新用户登录地区信息
    updateUserInfoLocation(info: { id: string; location: string }) {
      const userInfo: UserInfo | null = this.userInfo;
      if (userInfo) {
        userInfo.locations = this.userInfo?.locations?.filter((m) => m !== info.location);
        this.userInfo = userInfo;
      }
      // localStorage.setItem(USER_INFO_KEY, JSON.stringify(state.userInfo))
    },
    //获取权限列表
    async getPermissions() {
      const permissions = await getPermissionsApi();
      //设置路由列表
      this.permissions = permissions;
      // 这步会去掉is_hidden的菜单和btn的按钮
      const navList = formatTree(permissions as MenuModel[], 'pid', 0);
      this.setNavList(navList);
    },
  },
});

// Need to be used outside the setup
export const userStoreWithOut = () => {
  return userStore(pinia);
};
