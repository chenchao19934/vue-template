<!--
 * @Description: 子级菜单
 * @Autor: zwy
 * @Date: 2022-01-28 15:38:43
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-15 10:16:31
-->
<template>
  <a-sub-menu :key="menuInfo?.id">
    <template #title>{{ menuInfo?.title }}</template>
    <template v-for="item in menuInfo?.children" :key="'' + item.id">
      <template v-if="!item.children">
        <a-menu-item :key="'' + item.id">
          <router-link :to="'/' + item.path">
            {{ item.title }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="'' + item.id" :menu-info="item" />
      </template>
    </template>
  </a-sub-menu>
</template>
<script setup lang="ts">
  import { MenuModel } from '/@/api/others/model/menuModel';

  type PropType = {
    menuInfo: MenuModel | undefined;
  };

  defineProps<PropType>();
</script>
