<!--
 * @Description: 菜单管理
 * @Autor: zwy
 * @Date: 2021-12-30 09:28:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-07 09:28:33
-->
<template>
  <div class="page">
    <Breadcrumb :data="['系统管理', '菜单管理']" />
    <BasicList v-bind="state" ref="basicList">
      <!-- 按钮组插槽 -->
      <template #btns>
        <!-- 占位符 -->
        <span></span>
        <a-button v-permission="['add']" type="primary" @click="handleAddTopMenu"
          >添加主菜单</a-button
        >
      </template>
      <template #type="{ text }">
        {{ text === 2 ? '菜单' : '按钮' }}
      </template>
      <template #is_hidden="{ text }">
        <span v-if="text === -1" class="_text-success">是</span>
        <span v-else class="_text-info">否</span>
      </template>
      <template #operations="{ row }">
        <span
          v-if="row.type === 2"
          v-permission="['add']"
          class="btn-opera"
          @click="handelAddChildMenu(row)"
          >新建菜单</span
        >
        <span v-permission="['edit']" class="btn-opera ml-16px" @click="handelEditMenu(row.id)"
          >编辑</span
        >
        <a-popconfirm
          placement="left"
          ok-text="确定"
          cancel-text="取消"
          title="确定删除该菜单?"
          @confirm="handelDelMenu(row)"
        >
          <span v-permission="['delete']" class="btn-opera ml-16px">删除</span>
        </a-popconfirm>
      </template>
    </BasicList>
  </div>
  <MenuModal ref="menuModal" v-model="visible" @query="query" />
</template>
<script setup lang="ts">
  import { columns } from './data';
  import MenuModal from './components/MenuModal.vue';
  import { ref, reactive, computed } from 'vue';
  import { deleteMenuApi, getMenusApi } from '/@/api/systemSetting/systemManage/menuManage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { userStoreWithOut } from '/@/store/modules/user';

  const { createMessage } = useMessage();
  const userStore = userStoreWithOut();
  const list = computed(() => userStore.navList);
  console.log('navList000000', list.value);

  const menuModal = ref();
  const basicList = ref();
  let visible = ref(false);
  const state = reactive({
    apiName: getMenusApi,
    columns: columns,
    isMenuData: true,
    rowKey: 'id',
    hasPagination: false,
  });

  // 添加主菜单
  const handleAddTopMenu = () => {
    visible.value = true;
    menuModal.value.add({
      pId: 0,
      pTitle: '顶级菜单',
    });
  };

  // 添加子菜单
  const handelAddChildMenu = (menu) => {
    if (menu.type === 1) {
      createMessage.error('请不要给按钮添加后代菜单！');
      return;
    }
    visible.value = true;
    menuModal.value.add({
      pId: menu.id,
      pTitle: menu.title,
    });
  };

  // 编辑菜单
  const handelEditMenu = (id: number) => {
    visible.value = true;
    menuModal.value.edit(id);
  };

  // 删除菜单
  const handelDelMenu = (menu) => {
    if (menu.children && menu.children.length > 0) {
      createMessage.error('请先删除子菜单！');
      return;
    }
    deleteMenuApi(menu.id).then(() => {
      createMessage.success('菜单删除成功！');
      query();
      userStore.getPermissions();
    });
  };

  //获取表格数据
  const query = () => {
    basicList.value.getTableList();
  };
</script>
