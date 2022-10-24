<!--
 * @Description: 绑定邮箱
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 10:55:02
-->

<template>
  <a-modal
    :visible="modelValue"
    title="设置邮箱地址"
    :width="400"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    :confirmLoading="loading"
    @cancel="close"
    @ok="bindEmail"
  >
    <a-form
      :model="emailForm"
      autocomplete="off"
      layout="horizontal"
      :label-col="{ style: 'width: 110px' }"
      class="form-class"
    >
      <a-form-item v-show="oldEmailValue" label="原邮箱地址：">
        <a-input v-model:value="oldEmailValue" disabled />
      </a-form-item>
      <a-form-item label="绑定邮箱地址：" name="email" v-bind="validateInfos.email">
        <a-input v-model:value="emailForm.email" />
      </a-form-item>
      <a-form-item label="验证码：" name="code" v-bind="validateInfos.code">
        <div class="flexInput">
          <a-input v-model:value="emailForm.code" />
          <a-button type="primary" :disabled="count === 0 ? false : true" @click="sendCode">{{
            codeDesc
          }}</a-button>
        </div>
        <span v-show="codeDescribe" class="c-desc">{{ codeDescribe }}</span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { bindEmailApi, getEmailCodeApi } from '/@/api/systemSetting/accountManage/accountSet';
  import { message, Form } from 'ant-design-vue';
  import {
    ComponentPublicInstance,
    computed,
    getCurrentInstance,
    onUnmounted,
    reactive,
    ref,
  } from 'vue';

  type CellPhoneProType = {
    modelValue: boolean;
    module: 1 | 2; //1、设置手机号 2、修改手机号
    oldEmail?: string;
    cellPhoneCheckType: number;
  };
  type EmailDataType = {
    code: string;
    email: string;
  };
  const validateEmail = (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请输入新的邮箱');
      }
      const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      if (!reg.test(value)) {
        reject('请输入正确的邮箱');
      } else {
        resolve('');
      }
    });
  };
  const proxy = getCurrentInstance()?.proxy as ComponentPublicInstance<any>;
  const $bus = proxy.$bus;
  const props = withDefaults(defineProps<CellPhoneProType>(), {
    module: 2,
    modelValue: false,
    oldEmail: '',
  });
  const rules = ref<any>({
    email: [{ required: true, validator: validateEmail }],
    code: [{ required: true, message: '验证码不能为空' }],
  });

  const emit = defineEmits(['update:modelValue']);
  const emailForm = reactive<EmailDataType>({
    code: '',
    email: '',
  });
  const codeDescribe = ref('');
  const codeTimer = ref();
  const count = ref(0);
  let loading = ref(false);
  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(emailForm, rules);

  const oldEmailValue = computed(() => props.oldEmail);

  const codeDesc = computed(() => {
    if (count.value === 0) {
      return '获取验证码';
    } else {
      return count.value + '';
    }
  });
  const close = () => {
    resetFields();
    count.value = 0;
    codeDescribe.value = '';
    clearInterval(codeTimer.value);
    emit('update:modelValue', false);
  };
  //发送验证码
  const sendCode = async () => {
    try {
      const values = await validate('email');
      if (values && values.email) {
        try {
          emailForm.code = '';
          count.value = 60;
          codeTimer.value = setInterval(() => {
            if (count.value > 0) {
              count.value--;
            } else {
              clearInterval(codeTimer.value);
            }
          }, 1000);
          await getEmailCodeApi({ email: emailForm.email, module: 1 });
          message.success('验证码已发送，请注意查收');
          codeDescribe.value = '验证码已发送，请注意查收！';
        } catch (error) {
          count.value = 0;
          clearInterval(codeTimer.value);
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const bindEmail = () => {
    validate().then(async () => {
      try {
        loading.value = true;
        await bindEmailApi({
          module: props.oldEmail ? 2 : 1,
          type: 2,
          code: emailForm.code,
          email: emailForm.email,
        });
        message.success('设置邮箱成功');
        $bus.emit('updateAccountInfo');
        close();
      } finally {
        loading.value = false;
      }
    });
  };
  onUnmounted(() => {
    clearInterval(codeTimer.value);
  });
</script>
