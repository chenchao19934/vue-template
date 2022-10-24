<!--
 * @Description: 表单搜索模块
 * @Autor: zwy
 * @Date: 2022-01-08 15:07:46
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-30 11:58:06
-->

<template>
  <div ref="searchEl" class="form_search">
    <div class="flex">
      <div class="flex-1">
        <basic-form v-model:condition="queryForm" :items="formItems" />
      </div>
      <div class="form-btn">
        <a-button class="mr-10px" @click="handleReset">重置</a-button>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { onMounted, ref } from 'vue';

  type QueryProps = {
    formItems: object;
    initData: object;
  };

  const props = defineProps<QueryProps>();
  const emitEvents = defineEmits(['updateQueryParams']);

  let queryForm = reactive<object>(cloneDeep(props.initData));

  const handleSearch = () => {
    emitEvents('updateQueryParams', queryForm);
  };
  const handleReset = () => {
    queryForm = Object.assign(queryForm, cloneDeep(props.initData));
    emitEvents('updateQueryParams', queryForm);
  };

  const searchEl = ref();

  onMounted(() => {
    const $searh = searchEl.value;
    //监听enter键盘事件搜索
    let $inputList = $searh.querySelectorAll('input');
    $inputList.forEach((el) => {
      if (el.className == 'ant-input') {
        el.addEventListener('keydown', (event) => {
          if (event.keyCode == 13) {
            handleSearch();
          }
        });
      }
    });
  });
</script>
<style lang="less" scoped>
  .form_search {
    position: relative;
    margin-bottom: 20px;
    padding: 20px 20px 0;
    background: #fff;
    padding-right: 20px;
  }
  .form-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
    height: 32px;
    line-height: 32px;
    text-align: right;
    width: 140px;
  }
</style>
