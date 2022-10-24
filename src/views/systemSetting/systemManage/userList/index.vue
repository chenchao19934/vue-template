<!--
 * @Description: 用户列表
 * @Autor: zwy
 * @Date: 2021-12-30 09:28:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-10 18:33:13
-->
<template>
  <div class="page-content">
    <Breadcrumb :data="['系统管理', '用户列表']" />
    <BasicList v-bind="state" ref="basicList" @get-form-params="getFormParams">
      <template #level="{ text }">
        {{ text === 9 ? '主账号' : '子账号' }}
      </template>
      <template #status="{ text }">
        {{ text === 1 ? '启用' : '禁用' }}
      </template>
      <template #operations="{ row }">
        <div class="btn-opera" @click="handleLogger(row.id)">登录日志</div>
        <div v-permission="['edit']" class="btn-opera" @click="handleEdit(row)">编辑</div>
        <a-popconfirm
          placement="left"
          ok-text="确定"
          cancel-text="取消"
          title="确定删除该账号?"
          @confirm="handleDel(row.id)"
        >
          <div v-if="row.level === 1" v-permission="['delete']" class="btn-opera">删除</div>
        </a-popconfirm>
      </template>
    </BasicList>
  </div>
  <LoginLogModal ref="logModal" v-model="logVisible" />
  <UserEditModal ref="userModal" v-model="userVisible" @query="query" />
</template>
<script setup lang="ts">
  import { formItems, columns } from './data';
  import LoginLogModal from './components/LoginLogModal.vue';
  import UserEditModal from './components/UserEditModal.vue';
  import { ref, reactive, watch } from 'vue';
  import {
    Account,
    QyeryAccountParams,
  } from '/@/api/systemSetting/systemManage/model/userListModel';
  import { getUserListApi, deleteUserApi } from '/@/api/systemSetting/systemManage/userList';
  import { message } from 'ant-design-vue';
  import { cloneDeep } from 'lodash';

  type ColumnType = {
    title: string;
    dataIndex: string;
    key: string;
    align?: string;
  };

  const logModal = ref();
  let logVisible = ref(false);
  let userVisible = ref(false);
  const userModal = ref();
  let formLevel = ref(9);
  let dynaColumns = ref<Array<ColumnType>>([]);
  const initData: QyeryAccountParams = {
    status: '',
    username: '',
    level: 9,
  };
  const basicList = ref();
  const state = reactive({
    formItems,
    initData,
    apiName: getUserListApi,
    columns: dynaColumns,
    customClass: ['customPadding'],
  });
  watch(
    () => formLevel.value,
    (cur) => {
      if (cur !== 9) {
        let list: Array<ColumnType> = cloneDeep(columns);
        list.splice(4, 0, {
          title: '关联主账号',
          dataIndex: 'master_username',
          key: 'master_username',
          align: 'center',
        });
        dynaColumns.value = cloneDeep(list);
      } else {
        dynaColumns.value = cloneDeep(columns);
      }
    },
    { immediate: true }
  );

  // 登录日志
  const handleLogger = (customer_id) => {
    logVisible.value = true;
    logModal.value.logger(customer_id);
  };

  // 编辑
  const handleEdit = (acc: Account) => {
    userVisible.value = true;
    userModal.value.edit({
      customer_id: acc.id,
      realname: acc.realname,
      level: acc.level,
      status: acc.status,
    });
  };
  // 删除
  const handleDel = async (customer_id: number) => {
    await deleteUserApi({ customer_id });
    message.success('子账号删除成功！');
    query();
  };
  const getFormParams = (params: any) => {
    formLevel.value = params.level;
  };
  //获取表格数据
  const query = () => {
    basicList.value.getTableList();
  };
</script>
