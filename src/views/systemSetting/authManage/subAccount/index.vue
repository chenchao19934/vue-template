<!--
 * @Description: 子账号列表
 * @Autor: zwy
 * @Date: 2021-12-30 09:28:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-07 09:28:02
-->

<template>
  <div class="page-content">
    <Breadcrumb :data="['权限管理', '子账号列表']" />
    <BasicList
      v-bind="state"
      ref="basicList"
      @get-res-data="getResData"
      @get-checked-keys="getCheckedKeys"
    >
      <!-- 按钮组插槽 -->
      <template #btns>
        <div>
          <a-button
            v-permission="['batch_edit_role']"
            type="primary"
            class="mr-10px"
            @click="handleBatchRole"
          >
            批量修改角色
          </a-button>
          <a-button
            v-permission="['sub_batch_open']"
            type="primary"
            class="mr-10px"
            @click="handleBatchEnable"
          >
            批量启用
          </a-button>
          <a-button v-permission="['batch_edit_rule']" type="primary" @click="handleBatchRule">
            批量设置账号安全规则
          </a-button>
          <span class="ml-6px">已选择{{ chkedNums }}项，共{{ total }}项</span>
        </div>
        <div>
          <a-button
            v-permission="['add_sub_account']"
            type="primary"
            class="mr-10px"
            @click="handleAddAccount"
          >
            新增子账号
          </a-button>
          <a-button type="primary" @click="handletoSafetyRule">账号安全规则</a-button>
        </div>
      </template>
      <template #login_locations="{ row }">
        <div class="text-center">
          <template v-for="(item, index) in row.login_locations">
            <p v-if="index < 2" :key="index" class="_loction">
              {{ item }}
            </p>
          </template>
          <a
            v-if="row.login_locations.length > 2"
            href="javascript:void(0);"
            class="_text-primary"
            @click="handleReadLocations(row)"
          >
            更多
          </a>
        </div>
      </template>
      <template #lock="{ text }">
        {{ text === 0 ? '否' : '是' }}
      </template>
      <template #status="{ text }">
        <span v-if="text === 1" class="_text-success">启用</span>
        <span v-else class="_text-info">禁用</span>
      </template>
      <template #operations="{ row }">
        <div v-permission="['update_password']" class="btn-opera" @click="handleUpdatePwd(row.id)">
          修改密码
        </div>
        <div v-permission="['edit']" class="btn-opera" @click="handleEditAccount(row.id)">编辑</div>
        <a-popconfirm
          placement="left"
          ok-text="确定"
          cancel-text="取消"
          title="确定解锁该账号？"
          @confirm="handleUnlock(row.id)"
        >
          <div v-if="row.lock === 1" v-permission="['unlock']" class="btn-opera">解除锁定</div>
        </a-popconfirm>
      </template>
    </BasicList>
  </div>
  <SubAccountEditModal ref="subAccountModal" v-model="subAccountVisible" @query="query" />
  <RoleBatchEditModal v-model="roleVisible" :chkedIds="chkedIds" @query="query" />
  <RuleBatchEditModal v-model="ruleVisible" :chkedIds="chkedIds" @query="query" />
  <LoginLocationModal ref="loginLocationModal" v-model="locationVisible" />
  <SubPasswordEditModal ref="updatePwdModal" v-model="passwordVisible" />
</template>
<script setup lang="ts">
  import { formItems, columns } from './data';
  import SubAccountEditModal from './components/SubAccountEditModal.vue';
  import RoleBatchEditModal from './components/RoleBatchEditModal.vue';
  import RuleBatchEditModal from './components/RuleBatchEditModal.vue';
  import LoginLocationModal from './components/LoginLocationModal.vue';
  import SubPasswordEditModal from './components/SubPasswordEditModal.vue';
  import { Role } from '/@/api/systemSetting/authManage/model/roleListModel';
  import { getAllRolesApi } from '/@/api/systemSetting/authManage/roleList';
  import {
    getSubAccountListApi,
    unlockSubAccountApi,
    batchEnableSubAccountApi,
  } from '/@/api/systemSetting/authManage/subAccount';
  import { ref, reactive, onMounted, watch } from 'vue';
  import { SubAccount } from '/@/api/systemSetting/authManage/model/subAccountModel';
  import { useRouter } from 'vue-router';
  import { OptionsType } from '/@/api/others/model/commonModel';
  import { message } from 'ant-design-vue';

  type query_params = {
    username: string;
    role_ids: number[];
    order_by: string;
  };
  const subAccountModal = ref();
  const loginLocationModal = ref();
  const updatePwdModal = ref();
  const subAccountVisible = ref(false);
  const roleVisible = ref(false);
  const ruleVisible = ref(false);
  const passwordVisible = ref(false);
  const locationVisible = ref(false);

  // 角色options
  const roleOpts = ref<Role[]>([]);
  const chkedNums = ref<number>(0);
  const total = ref(0);
  const chkedIds = ref<number[]>([]);
  let hasChecked = ref(false); //是否有选中

  const initData: query_params = {
    username: '',
    role_ids: [],
    order_by: 'created:desc',
  };
  const basicList = ref();
  const state = reactive({
    formItems,
    initData,
    apiName: getSubAccountListApi,
    columns: columns,
    customClass: ['customPadding'],
    selectable: true,
    rowKey: 'id',
  });

  watch(
    () => roleOpts.value,
    (cur) => {
      //商户等级列表
      let roleList: Array<OptionsType> = [];
      roleList = cur.map((v) => {
        return {
          label: v.name,
          value: v.id,
        };
      });
      state.formItems.role_ids.props = {
        placeholder: '请选择角色',
        allowClear: true,
        mode: 'multiple',
        showArrow: true,
        options: roleList,
      };
    }
  );
  // 添加子账号
  const handleAddAccount = () => {
    subAccountVisible.value = true;
    subAccountModal.value.add();
  };
  const handleEditAccount = (id: number) => {
    subAccountVisible.value = true;
    subAccountModal.value.edit(id);
  };
  //修改密码
  const handleUpdatePwd = (id: number) => {
    passwordVisible.value = true;
    updatePwdModal.value.update(id);
  };

  // 批量修改角色
  const handleBatchRole = () => {
    getSign() && (roleVisible.value = true);
  };
  // 批量修改规则
  const handleBatchRule = () => {
    getSign() && (ruleVisible.value = true);
  };
  // 批量启用
  const handleBatchEnable = async () => {
    if (!getSign()) return;
    await batchEnableSubAccountApi({ sub_customer_id_list: chkedIds.value });
    message.success('批量启用成功！');
    query();
  };
  // 解除锁定
  const handleUnlock = async (customer_id: number) => {
    await unlockSubAccountApi({ customer_id });
    message.success('该子账号已经成功解锁！');
    query();
  };
  const handleReadLocations = (acc: SubAccount) => {
    locationVisible.value = true;
    loginLocationModal.value.show(acc);
  };

  const router = useRouter();
  //跳转账号安全规则页面
  const handletoSafetyRule = () => {
    router.push({
      path: '/sysSet/auth/safetyRule',
    });
  };
  //是否选中
  const getSign = () => {
    if (chkedIds.value.length === 0) {
      message.error('请至少选择一个账户');
      hasChecked.value = false;
    } else {
      hasChecked.value = true;
    }
    return hasChecked.value;
  };
  const getCheckedKeys = (ids: Array<number>) => {
    chkedNums.value = ids.length;
    chkedIds.value = ids;
  };
  const getResData = (data: any) => {
    total.value = data.total as number;
  };
  // 获取角色权限
  const getAllRoles = async () => {
    const data = await getAllRolesApi();
    roleOpts.value = data;
  };
  //获取表格数据
  const query = () => {
    basicList.value.getTableList();
  };
  onMounted(() => {
    getAllRoles();
  });
</script>

<style scoped lang="scss">
  ._loction {
    line-height: 20px;
    margin-bottom: 3px;
  }
</style>
