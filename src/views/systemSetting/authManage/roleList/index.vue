<!--
 * @Description: 角色权限
 * @Autor: zwy
 * @Date: 2021-12-30 09:28:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 10:11:37
-->
<template>
  <div class="page-content">
    <Breadcrumb :data="['权限管理', '角色权限']" />
    <BasicList v-bind="state" ref="basicList">
      <!-- 按钮组插槽 -->
      <template #btns>
        <!-- 占位符 -->
        <span></span>
        <a-button v-permission="['add']" type="primary" @click="handleAdd">添加角色</a-button>
      </template>
      <template #operations="{ row }">
        <span v-permission="['edit']" class="btn-opera" @click="handleEdit(row.id)">编辑</span>
        <a-popconfirm
          placement="left"
          ok-text="确定"
          cancel-text="取消"
          title="确定删除该角色?"
          @confirm="handleDel(row.id)"
        >
          <span v-permission="['delete']" class="btn-opera ml-16px">删除</span>
        </a-popconfirm>
      </template>
    </BasicList>
  </div>
  <RoleDrawer ref="roleDrawer" v-model="visible" @query="query" />
</template>
<script setup lang="ts">
  import RoleDrawer from './components/RoleDrawer.vue';
  import { formItems, columns } from './data';
  import { ref, reactive, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { getRoleListApi, deleteRoleApi } from '/@/api/systemSetting/authManage/roleList';
  import { useRoute, useRouter } from 'vue-router';
  import { omit } from 'lodash-es';

  const route = useRoute();
  const router = useRouter();
  const roleDrawer = ref();
  let visible = ref(false); //抽屉显示

  const initData = {
    name: '',
  };
  const basicList = ref();
  const state = reactive({
    formItems,
    initData,
    apiName: getRoleListApi,
    columns: columns,
  });
  const handleAdd = () => {
    visible.value = true;
    roleDrawer.value.add();
  };
  const handleEdit = (id: number) => {
    visible.value = true;
    roleDrawer.value.edit(id);
  };
  const handleDel = async (id: number) => {
    await deleteRoleApi(id);
    message.success('角色删除成功！');
    query();
  };
  //获取表格数据
  const query = () => {
    basicList.value.getTableList();
  };
  onMounted(() => {
    if (route.query.type === 'add') {
      //移除query
      let newQuery = omit(route.query, 'type');
      router.replace({ query: newQuery });
      handleAdd();
    }
  });
</script>
