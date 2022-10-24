<!--
 * @Description: 角色列表-添加角色抽屉
 * @Autor: zwy
 * @Date: 2021-12-01 16:41:58
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-10 15:35:46
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
        <a-form-item label="角色名称：" name="name" v-bind="validateInfos.name">
          <a-input v-model:value="form.name" allowClear />
        </a-form-item>
        <a-form-item label="角色描述：" name="description">
          <a-input v-model:value="form.description" allowClear />
        </a-form-item>
        <a-form-item label="角色权限：">
          <a-tree
            v-if="menuTree.data && menuTree.data.length > 0"
            v-model:checkedKeys="form.rule_ids"
            :fieldNames="{ children: 'children', title: 'title', key: 'id' }"
            defaultExpandAll
            checkable
            :treeData="menuTree.data"
            @check="handelCheckChange"
          />
        </a-form-item>
      </a-form>
    </div>
    <a-divider class="divider-style" />
    <div class="w-full text-center">
      <a-button type="primary" :loading="loading" @click="submit">保存</a-button>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { message, Form } from 'ant-design-vue';
  import { Role } from '/@/api/systemSetting/authManage/model/roleListModel';
  import { Menu } from '/@/api/others/model/menuModel';
  import { SaveDataParams } from '/@/api/others/model/commonModel';
  import { getRoleMenuApi } from '/@/api/systemSetting/authManage/roleList';
  import { saveData } from '/@/utils/common';
  import { cloneDeep } from 'lodash-es';
  import {
    getRoleDetailApi,
    addRoleApi,
    updateRoleApi,
  } from '/@/api/systemSetting/authManage/roleList';

  type MenuInTree = { id: number; btnList?: Menu[]; children?: MenuInTree[]; key: number } & Menu;
  type BaseDrawerPropType = {
    modelValue: boolean; //显示抽屉
  };

  withDefaults(defineProps<BaseDrawerPropType>(), { modelValue: false });
  const emitEvents = defineEmits(['update:modelValue', 'query']);

  const title = ref<string>('');
  const roleId = ref();
  let halfCheckedIds = ref([]); //半选状态id
  let checkedIds = ref<number[]>([]);
  let roleList = ref<MenuInTree[]>();

  let menuTree = reactive<{
    menus: Menu[];
    data: MenuInTree[];
    props: { children: any; label: string; disabled: string };
    checkKeys: number[];
    checkedBtnList: number[];
  }>({
    menus: [],
    data: [],
    props: {
      children: 'children',
      label: 'title',
      disabled: '',
    },
    checkKeys: [],
    checkedBtnList: [],
  });
  const form = reactive<Role>({
    id: 0,
    name: '',
    description: '',
    rule_ids: [],
  });

  const rules = reactive({
    name: [
      {
        required: true,
        message: '请输入角色名称',
      },
    ],
  });
  let loading = ref(false);
  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(form, rules);

  const formatTree = (data: MenuInTree[] | undefined, pidName: string, rootPid: number) => {
    if (data) {
      let root: MenuInTree[] = [];
      const idMapping = data.reduce((acc, el, i) => {
        acc[el.id || 0] = i;
        return acc;
      }, {});

      data.forEach((el) => {
        el.key = el.id;
        // 判断根节点
        if (el[pidName] === rootPid) {
          root.push(el);
          return;
        }
        // 用映射表找到父元素
        const parentEl = data[idMapping[el[pidName]]];
        if (!!parentEl) {
          // 把当前元素添加到父元素的`children`数组中
          parentEl.children = [...(parentEl.children || []), el];
        }
      });

      return root;
    } else {
      return [];
    }
  };

  const submit = () => {
    validate().then(() => {
      if (form.rule_ids.length === 0) {
        message.error('请至少选择一个权限！');
        return;
      }
      let params = {
        ...form,
        rule_ids: form.rule_ids.concat(halfCheckedIds.value), //把半选的父级带上
      };
      let paramsObj: SaveDataParams = {
        loading,
        params,
        editFunc: updateRoleApi,
        addFunc: addRoleApi,
        editMsg: '角色修改成功！',
        addMsg: '角色添加成功！',
        emitEvents,
        clear,
      };
      saveData(paramsObj);
    });
  };
  const handelCheckChange = (checkedKeys, e) => {
    console.log('checkedKeys', checkedKeys);
    halfCheckedIds.value = e.halfCheckedKeys;
  };
  //循环遍历树节点,获取父子节点映射
  let pcMap = {};
  const loopDealData = (arr) => {
    arr.forEach((v) => {
      let cIds: number[] = [];
      if (v.children) {
        cIds = v.children.map((m) => m.id);
        loopDealData(v.children);
      }
      pcMap[v.id] = cIds;
    });
  };
  const dealData = async () => {
    let taskes = [getRoleMenuApi()];
    if (roleId.value) {
      taskes.push(getRoleDetailApi(+roleId.value));
    }

    Promise.all(taskes).then((res) => {
      let menus = res[0] as MenuInTree[];
      // console.log('menus888888', JSON.stringify(menus));
      //获取角色信息
      if (res[1]) {
        let detail = res[1];
        form.id = detail.id;
        form.description = detail.description;
        form.name = detail.name;
        checkedIds.value = detail.member_rule_id_list;
      }
      menuTree.data = formatTree(menus, 'pid', 0);

      //过滤掉子级没有全部选中的父级id
      loopDealData(menuTree.data);
      // console.log('pcMap', pcMap)
      let keys = Object.keys(pcMap);
      let copyData = cloneDeep(pcMap);
      //获取子孙级菜单的id
      for (let i in copyData) {
        keys.forEach((v) => {
          if (copyData[i].includes(Number(v))) {
            copyData[i] = [...copyData[i], ...copyData[v]];
          }
        });
      }
      // console.log('处理过后', copyData)
      pcMap = cloneDeep(copyData);

      let ids = checkedIds.value.filter((v) => {
        let key = v.toString();
        //父级
        if (Object.keys(pcMap).includes(key)) {
          return pcMap[key].every((m: number) => checkedIds.value.includes(Number(m))); //子级全部选中才允许勾选父级
        } else {
          return true;
        }
      });
      form.rule_ids = ids;
    });
  };
  //清除数据
  const clear = () => {
    roleId.value = undefined;
    halfCheckedIds.value = [];
    checkedIds.value = [];
    roleList.value = [];
    resetFields();
    emitEvents('update:modelValue', false);
  };
  //关闭抽屉
  const handleClose = () => {
    clear();
  };
  const add = () => {
    title.value = '添加角色';
    dealData();
  };
  const edit = (id: number) => {
    title.value = '编辑角色';
    roleId.value = id;
    // getRoleInfo()
    dealData();
  };
  defineExpose({
    add,
    edit,
  });
</script>

<style scoped lang="scss">
  // .content {
  //   height: calc(100vh - 120px);
  //   overflow: auto;
  //   padding-right: 12px;
  //   padding-top: 12px;
  // }

  // .divider-style {
  //   background-color: rgba(0, 0, 0, 0.06);
  //   margin-top: 0;
  //   margin-bottom: 9px;
  // }
</style>
