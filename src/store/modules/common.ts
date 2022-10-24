/*
 * @Description:  公共存储模块
 * @Autor: zwy
 * @Date: 2021-11-29 16:32:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-14 15:46:52
 */
import { defineStore } from 'pinia';
import { pinia } from '..';

export const commonStore = defineStore('common', {
  state: () => ({
    // groupList: [],
  }),
  actions: {
    // getGroupList({ commit, state }) {
    //   if (state.groupList.length > 0) {
    //     return;
    //   }
    //   return new Promise((resolve, _reject) => {
    //     getEffectGroupLevelList().then((res) => {
    //       commit('setGroupList', res?.data);
    //       resolve(null);
    //     });
    //   });
    // },
  },
});

export const commonStoreWithOut = () => {
  return commonStore(pinia);
};
