<!--
 * @Description: 修改密码-子账号列表
 * @Autor: zwy
 * @Date: 2022-01-27 09:29:59
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 10:13:50
-->

<template>
  <a-modal
    :visible="modelValue"
    title="修改密码"
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
      :label-col="{ style: 'width: 110px' }"
      class="form-class"
    >
      <a-form-item label="密码：" name="password" v-bind="validateInfos.password">
        <a-input-password
          v-model:value="form.password"
          allowClear
          placeholder="请输入6-20位密码,需包含数字、字母、符号任意2种"
        />
        <div class="_strength" :class="[`is-level${password_level}`]">
          <a-tag
            v-for="(level, index) in PasswordLevelObj"
            :key="index"
            :color="password_level >= index ? 'warning' : 'default'"
            >{{ level }}</a-tag
          >
        </div>
      </a-form-item>
      <a-form-item label="重复新密码：" name="repeatPassword" v-bind="validateInfos.repeatPassword">
        <a-input-password
          v-model:value="form.repeatPassword"
          allowClear
          placeholder="请再次输入新密码"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { PasswordLevelObj } from '/@/enums/common';
  import { getPasswordLevel } from '/@/utils/passwordUtil';
  import { updateSubAccountPwdApi } from '/@/api/systemSetting/authManage/subAccount';
  import { Form, message } from 'ant-design-vue';

  interface ModalType {
    modelValue: boolean;
  }

  withDefaults(defineProps<ModalType>(), { modelValue: false });

  const password_level = ref(0);
  let loading = ref(false);
  const form = reactive<{ customer_id: number; password: string; repeatPassword: string }>({
    customer_id: -1,
    password: '',
    repeatPassword: '',
  });

  const validatePassword = (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请输入用户密码');
      }
      //不允许中文和空格
      const reg = /^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,20}$/;
      if (reg.test(value)) {
        password_level.value = getPasswordLevel(value);
        if (password_level.value < 2) {
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
        reject('请重新输入新密码');
      }
      if (value !== form.password) {
        reject('两次输入的密码不一致');
      } else {
        resolve('');
      }
    });
  };
  const rules = reactive({
    password: [{ required: true, validator: validatePassword }],
    repeatPassword: [{ required: true, validator: validateConfirmPassword }],
  });

  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(form, rules);

  // watch(
  //   () => form.password,
  //   (val) => {
  //     password_level.value = getPasswordLevel(val || '');
  //   }
  // );

  const emitEvents = defineEmits(['update:modelValue']);

  // 添加规则方法
  const update = (customer_id: number) => {
    form.customer_id = customer_id;
  };
  const close = () => {
    resetFields();
    password_level.value = 0;
    emitEvents('update:modelValue', false);
  };

  const submit = () => {
    validate().then(async () => {
      try {
        loading.value = true;
        let params = {
          customer_id: form.customer_id,
          password: form.password,
        };
        await updateSubAccountPwdApi(params);
        close();
        message.success('密码修改成功！');
      } finally {
        loading.value = false;
      }
    });
  };

  defineExpose({
    update,
  });
</script>
