<!--
 * @Description: 添加主菜单、新增菜单、编辑菜单-弹窗
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-10 15:42:18
-->

<template>
  <a-drawer
    :visible="modelValue"
    width="50%"
    class="drawer-class"
    :title="title"
    :maskClosable="false"
    placement="right"
    @close="handleClose"
  >
    <div class="drawer-content">
      <a-form
        :model="form"
        autocomplete="off"
        layout="horizontal"
        :label-col="{ style: 'width: 110px' }"
        class="form-class"
      >
        <a-form-item label="菜单类型：" name="type">
          <a-radio-group v-model:value="form.type" button-style="solid">
            <a-radio-button :value="2">菜单</a-radio-button>
            <a-radio-button :value="1">按钮</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="isMenu" label="菜单隐藏：" name="is_hidden">
          <a-radio-group v-model:value="form.is_hidden" button-style="solid">
            <a-radio-button :value="1">是</a-radio-button>
            <a-radio-button :value="-1">否</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="isMenu" label="外链菜单：" name="is_blank">
          <a-radio-group v-model:value="form.is_blank" button-style="solid">
            <a-radio-button :value="1">是</a-radio-button>
            <a-radio-button :value="-1">否</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="路由标识：" name="is_path">
          <a-radio-group v-model:value="form.is_path" button-style="solid">
            <a-radio-button :value="1">是</a-radio-button>
            <a-radio-button :value="-1">否</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="菜单权限：" name="is_public">
          <a-select v-model:value="form.is_public">
            <a-select-option :value="1">超级管理员和普通管理员均可用</a-select-option>
            <a-select-option :value="-1">仅超级管理员可用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="isMenu" label="菜单图标：" name="icon">
          <a-input v-model:value="form.icon" allowClear />
        </a-form-item>
        <a-form-item
          :label="isMenu ? '菜单标题：' : '按钮名称：'"
          name="title"
          v-bind="validateInfos.title"
        >
          <a-input v-model:value="form.title" allowClear />
        </a-form-item>
        <a-form-item v-if="isPath" label="路由地址：" name="path" v-bind="validateInfos.path">
          <a-input v-model:value="form.path" allowClear />
        </a-form-item>
        <a-form-item v-if="isPath" label="组件路径：" name="component">
          <a-input v-model:value="form.component" allowClear />
        </a-form-item>
        <a-form-item label="权限标识：" name="permission">
          <a-input v-model:value="form.permission" allowClear />
        </a-form-item>
        <a-form-item v-if="isMenu" label="排序：" name="sort">
          <a-input-number v-model:value="form.sort" allowClear :min="1" />
        </a-form-item>
        <a-form-item label="接口标识：" name="api_route">
          <a-input v-model:value="form.api_route" allowClear />
        </a-form-item>
        <a-form-item v-if="menuPTitle" label="上级目录：">
          {{ menuPTitle }}
        </a-form-item>
      </a-form>
    </div>
    <a-divider class="divider-style" />
    <div class="w-full text-center">
      <a-button type="primary" :loading="loading" @click="submit">完成</a-button>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
  import { Menu } from '/@/api/others/model/menuModel';
  import {
    getMenuDetailApi,
    addMenuApi,
    editMenuApi,
  } from '/@/api/systemSetting/systemManage/menuManage';
  import { ref, reactive, watch, computed } from 'vue';
  import { Form } from 'ant-design-vue';
  import { saveData } from '/@/utils/common';
  import { SaveDataParams } from '/@/api/others/model/commonModel';
  import { cloneDeep } from 'lodash-es';
  import { userStoreWithOut } from '/@/store/modules/user';

  type BaseModalPropType = {
    modelValue: boolean; //显示抽屉
  };
  withDefaults(defineProps<BaseModalPropType>(), { modelValue: false });

  const userStore = userStoreWithOut();

  const emitEvents = defineEmits(['update:modelValue', 'query']);

  const visible = ref<boolean>(false);
  const title = ref<string>('');
  const menuPTitle = ref<string>('');
  let loading = ref();
  const rules = reactive<any>({
    title: [{ required: true, message: '请输入标题名称' }],
    path: [],
    // path: [{ required: true, message: '请输入路由地址' }]
  });

  const form = reactive<Menu>({
    pid: 0,
    title: '',
    type: 2,
    sort: 1,
    is_hidden: -1,
    is_blank: -1,
    is_path: -1,
    component: '',
    permission: '',
    api_route: '',
    path: '',
    icon: '',
    tip: '',
    is_public: -1,
  });

  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(form, rules);

  //是否是路由
  const isPath = computed(() => {
    return form.is_path === 1 ? true : false;
  });
  //是否是菜单
  const isMenu = computed(() => {
    return form.type === 2 ? true : false;
  });

  // todo 动态表单验证
  watch(
    () => isMenu.value,
    (cur) => {
      rules.title = [{ required: true, message: `请输入${cur ? '菜单' : '按钮'}名称` }];
    },
    { immediate: true }
  );
  watch(
    () => isPath.value,
    (cur) => {
      rules['path'] = cur ? [{ required: true, message: '请输入路由地址' }] : [];
    }
  );
  // 添加规则方法
  const add = ({ pId, pTitle }) => {
    title.value = '新增菜单';
    visible.value = true;
    form.pid = pId;
    menuPTitle.value = pTitle;
  };
  const edit = async (id: number) => {
    title.value = '编辑菜单';
    visible.value = true;
    const menu = await getMenuDetailApi(id);
    // console.log('编辑菜单99999999999999999', JSON.stringify(menu));
    form.id = menu.id;
    form.pid = menu.pid;
    form.title = menu.title;
    form.type = menu.type;
    form.sort = menu.sort;
    form.is_hidden = menu.is_hidden;
    form.is_blank = menu.is_blank;
    form.is_path = menu.is_path;
    form.component = menu.component;
    form.permission = menu.permission;
    form.api_route = menu.api_route;
    form.path = menu.path;
    form.icon = menu.icon;
    form.tip = menu.tip;
    form.is_public = menu.is_public;
  };
  const clear = () => {
    delete form.id;
    resetFields();
  };
  const handleClose = () => {
    clear();
    emitEvents('update:modelValue', false);
  };
  const submit = () => {
    validate()
      .then(() => {
        let paramsObj: SaveDataParams = {
          loading,
          params: cloneDeep(form),
          editFunc: editMenuApi,
          addFunc: addMenuApi,
          editMsg: '修改菜单成功',
          addMsg: '新增菜单成功',
          emitEvents,
          clear,
        };
        saveData(paramsObj);
      })
      .then(() => {
        userStore.getPermissions();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  defineExpose({
    add,
    edit,
  });
</script>
