<!--
 * @Description: 基础布局
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-28 21:23:07
-->
<template>
  <a-layout class="layout">
    <Header />
    <a-layout-content class="main"><router-view /></a-layout-content>
    <Footer />
  </a-layout>
</template>

<script lang="ts" setup>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
</script>

<style lang="scss" scoped>
  .layout {
    min-height: 100vh;

    .main {
      padding: 20px 20px 0;
    }
  }
</style>
