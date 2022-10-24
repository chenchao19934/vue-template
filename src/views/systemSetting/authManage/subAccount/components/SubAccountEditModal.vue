<!--
 * @Description: 新增、编辑子账号弹窗
 * @Autor: zwy
 * @Date: 2022-01-27 09:29:59
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 16:38:37
-->

<template>
  <a-modal
    :visible="modelValue"
    :title="`${isEdit ? '编辑' : '新增'}子账号`"
    :width="600"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    :confirmLoading="loading"
    okText="保存"
    @cancel="close"
    @ok="submit"
  >
    <a-form
      :model="form"
      autocomplete="off"
      layout="horizontal"
      :label-col="{ style: 'width: 160px' }"
      class="form-class"
    >
      <a-form-item label="用户名：" name="username" v-bind="validateInfos.username">
        <a-input
          v-model:value="form.username"
          :disabled="isEdit"
          allowClear
          placeholder="支持字母、数字和下划线，4-30字符"
          :maxlength="30"
        />
      </a-form-item>
      <a-form-item v-if="!isEdit" label="密码：" name="password" v-bind="validateInfos.password">
        <a-input-password
          v-model:value="form.password"
          allowClear
          placeholder="请输入6-20位密码,需包含数字、字母、符号任意2种"
        />
        <div class="_strength" :class="[`is-level${form.password_level}`]">
          <a-tag
            v-for="(level, index) in PasswordLevelObj"
            :key="index"
            :color="form.password_level >= index ? 'warning' : 'default'"
            >{{ level }}</a-tag
          >
        </div>
      </a-form-item>
      <a-form-item
        v-if="!isEdit"
        label="确认密码："
        name="repeat_password"
        v-bind="validateInfos.repeat_password"
      >
        <a-input-password
          v-model:value="form.repeat_password"
          allowClear
          placeholder="请输入6-20位密码,需包含数字、字母、符号任意2种"
        />
      </a-form-item>
      <a-form-item label="真实姓名：" name="realname" v-bind="validateInfos.realname">
        <a-input v-model:value="form.realname" allowClear placeholder="请输入真实姓名" />
      </a-form-item>
      <a-form-item label="角色：" name="role_ids" v-bind="validateInfos.role_ids">
        <div class="l-flex-cfs">
          <a-select v-model:value="form.role_ids" style="width: 220px" placeholder="请选择角色权限">
            <a-select-option v-for="item in roleList" :key="item.id" :value="item.id">{{
              item.name
            }}</a-select-option>
          </a-select>
          <a class="_text-primary ml-10px" href="javascript:void(0);" @click="createRole"
            >+创建角色</a
          >
        </div>
      </a-form-item>
      <a-form-item
        label="账号安全规则："
        name="safety_rule_id"
        v-bind="validateInfos.safety_rule_id"
      >
        <div class="l-flex-cfs">
          <a-select
            v-model:value="form.safety_rule_id"
            style="width: 220px"
            placeholder="请选择账号安全规则"
          >
            <a-select-option v-for="item in safetyRuleList" :key="item.id" :value="item.id">{{
              item.name
            }}</a-select-option>
          </a-select>
          <a class="_text-primary ml-10px" href="javascript:void(0);" @click="createSafetyRule"
            >+创建账号安全规则</a
          >
        </div>
      </a-form-item>
      <a-form-item label="排序值：" name="position" v-bind="validateInfos.position">
        <a-input-number v-model:value="form.position" :min="0" />
      </a-form-item>
      <a-form-item label="状态：" name="status" v-bind="validateInfos.status">
        <a-radio-group v-model:value="form.status">
          <a-radio :value="1">启用</a-radio>
          <a-radio :value="-1">禁用</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
  <RuleEditModal ref="ruleEditModal" v-model="ruleVisible" @query="getRulesList" />
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, watch } from 'vue';
  import { PasswordLevelObj } from '/@/enums/common';
  import { getPasswordLevel } from '/@/utils/passwordUtil';
  import { SubAccount } from '/@/api/systemSetting/authManage/model/subAccountModel';
  import { Role } from '/@/api/systemSetting/authManage/model/roleListModel';
  import { getAllRolesApi } from '/@/api/systemSetting/authManage/roleList';
  import { getAllRulesApi } from '/@/api/systemSetting/authManage/safetyRule';
  import { useRouter } from 'vue-router';
  import {
    getSubAccountDetailApi,
    addSubAccountApi,
    updateSubAccountApi,
  } from '/@/api/systemSetting/authManage/subAccount';
  import { Form, message } from 'ant-design-vue';

  interface ModalType {
    modelValue: boolean;
  }

  withDefaults(defineProps<ModalType>(), { modelValue: false });
  const ruleEditModal = ref();
  let loading = ref(false);
  const form = reactive<{ password_level: number; customer_id?: number | undefined } & SubAccount>({
    username: '',
    password: '',
    repeat_password: '', //确认密码
    realname: '',
    role_ids: undefined,
    safety_rule_id: undefined,
    position: 0,
    status: 1,
    password_level: 0,
  });
  const router = useRouter();
  const roleList = ref<Role[]>([]);
  const safetyRuleList = ref<any[]>([]);
  const isEdit = ref(false);
  const ruleVisible = ref(false);

  const validatePassword = (_, value) => {
    // const reg = /^(?![\d]+$)(?![a-zA-z]+$)(?![^\da-zA-Z]+$).{6,20}$/
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请输入用户密码');
      }
      //不允许中文和空格
      const reg = /^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,20}$/;
      if (reg.test(value)) {
        form.password_level = getPasswordLevel(value);
        if (form.password_level < 2) {
          reject('密码强度过低，极易被破解，请设置中级以上');
        } else {
          resolve('');
        }
      } else {
        reject('6-20位字符，必须包含数字、字母和符号任意两种、密码强度必须达到中以上');
      }
    });
  };
  const validateConfirmPassword = (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请重新输入密码');
      }
      if (value !== form.password) {
        reject('两次输入的密码不一致');
      } else {
        resolve('');
      }
    });
  };
  const validateUsername = (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请输入用户名');
      }
      if (value.length < 4 || value.length > 30) {
        reject('请输入4-30位的用户名');
      } else {
        resolve('');
      }
    });
  };
  const rules = reactive<any>({
    username: [{ required: true, validator: validateUsername }],
    password: [],
    repeat_password: [],
    // password: [{ required: true, validator: validatePassword }],
    // repeat_password: [{ required: true, validator: validateConfirmPassword }],
    realname: [{ required: true, message: '请输入用户真实姓名' }],
    role_ids: [{ required: true, message: '请选择角色权限' }],
    safety_rule_id: [{ required: true, message: '请选择账号安全规则' }],
    position: [{ required: true, message: '请输入排序值' }],
    status: [{ required: true, message: '请输入用户状态' }],
  });

  watch(
    () => isEdit.value,
    (cur) => {
      rules['password'] = cur ? [] : [{ required: true, validator: validatePassword }];
      rules['repeat_password'] = cur
        ? []
        : [{ required: true, validator: validateConfirmPassword }];
    },
    { immediate: true }
  );
  // watch(
  //   () => form.password,
  //   (val) => {
  //     form.password_level = getPasswordLevel(val || '');
  //   }
  // );

  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(form, rules);

  const emitEvents = defineEmits(['query', 'update:modelValue']);

  const close = () => {
    resetFields();
    form.customer_id = undefined;
    emitEvents('update:modelValue', false);
  };
  const createRole = () => {
    router.push({
      path: '/sysSet/auth/roleList',
      query: {
        type: 'add',
      },
    });
  };

  const createSafetyRule = () => {
    ruleVisible.value = true;
    ruleEditModal.value.add();
  };

  const add = () => {
    isEdit.value = false;
    form.username = '';
    form.password = '';
  };
  const edit = async (id: number) => {
    isEdit.value = true;
    const data = await getSubAccountDetailApi(id);
    // console.log('55555getSubAccountDetailApi', JSON.stringify(data));
    form.customer_id = data.id;
    form.username = data.username;
    form.realname = data.realname;
    form.role_ids = data.role_ids ? data.role_ids[0] : undefined;
    form.safety_rule_id = data.safety_rule_id;
    form.position = data.position;
    form.status = data.status;
  };
  const submit = () => {
    validate().then(async () => {
      try {
        loading.value = true;
        let params = {
          ...form,
          role_ids: form.role_ids ? [form.role_ids] : [],
        };
        isEdit.value ? await updateSubAccountApi(params) : await addSubAccountApi(params);
        close();
        message.success(`子账号${isEdit.value ? '修改' : '添加'}成功！`);
        emitEvents('query');
      } finally {
        loading.value = false;
      }
    });
  };
  const getRulesList = async () => {
    const data = await getAllRulesApi();
    // console.log('CCCCC9999', JSON.stringify(data));
    safetyRuleList.value = data?.list;
  };
  const getRolesList = async () => {
    const data = await getAllRolesApi();
    roleList.value = data;
  };

  onMounted(() => {
    getRolesList();
    getRulesList();
  });

  defineExpose({
    add,
    edit,
  });
</script>
