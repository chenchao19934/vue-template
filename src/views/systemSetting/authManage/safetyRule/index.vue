<!--
 * @Description: 账号安全规则
 * @Autor: zwy
 * @Date: 2021-12-30 09:28:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-07 09:26:14
-->

<template>
  <div class="page-content">
    <Breadcrumb :data="['权限管理', '账号安全规则']" />
    <BasicList v-bind="state" ref="basicList">
      <!-- 按钮组插槽 -->
      <template #btns>
        <!-- 占位符 -->
        <span></span>
        <a-button v-permission="['add']" type="primary" @click="handleAddRule">新增规则</a-button>
      </template>
      <template #equipment_type="{ text }">
        {{ text === 1 ? '多设备同时登录' : '单设备登录' }}
      </template>
      <template #ip="{ row, text }">
        <template v-for="(item, index) in text.split('\n')" :key="index">
          <div v-if="index < 3" class="_ip">{{ item }}</div>
        </template>
        <a
          v-if="text.split('\n').length > 3"
          class="_text-primary"
          href="javascript: void(0);"
          @click="handleEdit(row.id)"
          >更多</a
        >
      </template>
      <template #operations="{ row }">
        <span v-permission="['edit']" class="btn-opera" @click="handleEdit(row.id)">编辑</span>
        <a-popconfirm
          placement="left"
          ok-text="确定"
          cancel-text="取消"
          title="确定删除该规则?"
          @confirm="handleDel(row.id)"
        >
          <span v-permission="['delete']" class="btn-opera ml-16px">删除</span>
        </a-popconfirm>
      </template>
    </BasicList>
  </div>
  <RuleEditModal ref="ruleEditModal" v-model="ruleVisible" @query="query" />
</template>
<script setup lang="ts">
  import { columns } from './data';
  import { ref, reactive } from 'vue';
  import { getRuleListApi, deleteRuleApi } from '/@/api/systemSetting/authManage/safetyRule';
  import { message } from 'ant-design-vue';

  const ruleEditModal = ref();
  const basicList = ref();
  const ruleVisible = ref(false);
  const state = reactive({
    apiName: getRuleListApi,
    columns: columns,
  });

  // 添加
  const handleAddRule = () => {
    ruleVisible.value = true;
    ruleEditModal.value.add();
  };
  // 编辑
  const handleEdit = (id: number) => {
    ruleVisible.value = true;
    ruleEditModal.value.edit(id);
  };
  // 删除
  const handleDel = async (id: number) => {
    await deleteRuleApi(id);
    message.success('账号安全规则删除成功！');
    query();
  };
  //获取表格数据
  const query = () => {
    basicList.value.getTableList();
  };
</script>

<style scoped lang="scss">
  ._ip {
    line-height: 20px;
    word-break: break-all;
    text-align: center;
  }
</style>
