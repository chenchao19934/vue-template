<template>
  <a-config-provider :locale="zhCN">
    <router-view />
    <div class="loading" :class="{ showLoading: system.isLoading }">
      <a-spin size="large" />
    </div>
  </a-config-provider>
</template>

<script lang="ts" setup>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import { systemStore } from '/@/store/modules/system';

  const system = systemStore();
</script>

<style lang="scss">
  // 全局loading
  .loading {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    background: rgb(0 0 0 / 5%);
    display: none;
  }

  .showLoading {
    display: flex;
  }
</style>
