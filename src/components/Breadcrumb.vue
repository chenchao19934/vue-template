<!--
 * @Description: 面包屑
 * @Autor: zwy
 * @Date: 2022-02-10 15:48:54
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-19 21:08:40
-->
<template>
  <a-breadcrumb separator=">">
    <a-breadcrumb-item v-for="item in data" :key="item">{{ item }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
  defineProps({
    data: Array,
  });
</script>

<style lang="scss" scoped>
  .ant-breadcrumb > span:last-child {
    color: $primaryColor;
  }
</style>
