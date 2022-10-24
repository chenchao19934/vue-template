<!--
 * @Description: 账号设置列表
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-14 17:49:54
-->
<template>
  <div>
    <div class="flex-con">
      <div class="left">
        <div>
          <slot name="top"></slot>
        </div>
        <div class="bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <a-divider />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  :deep(.ant-divider-horizontal) {
    color: #f0f0f0;
    margin: 0;
  }

  .flex-con {
    display: flex;
    justify-content: space-around;
    margin: 21px auto;

    .left {
      flex: 1;
      padding-right: 20px;
    }

    .right {
      width: 200px;
      display: flex;
      align-items: center;
    }

    .bottom {
      margin-top: 6px;
    }
  }
</style>
