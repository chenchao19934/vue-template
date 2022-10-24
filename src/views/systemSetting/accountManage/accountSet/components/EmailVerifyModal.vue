<!--
 * @Description: 邮箱验证方式
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 10:54:57
-->

<template>
  <a-modal
    :visible="modelValue"
    title="验证方式"
    :width="400"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    :confirmLoading="loading"
    @cancel="close"
    @ok="verifyCode"
  >
    <a-form
      :model="verifyForm"
      autocomplete="off"
      layout="horizontal"
      :label-col="{ style: 'width: 110px' }"
      class="form-class"
    >
      <a-form-item label="验证方式：" name="type" v-bind="validateInfos.type">
        <a-select
          v-model:value="verifyForm.type"
          :disabled="typeDisabeld"
          placeholder="请选择验证方式"
        >
          <a-select-option v-for="item in options" :key="item.value" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-show="verifyForm.type === 1" label="原手机号号码：">
        <a-input v-model:value="oldMobileValue" disabled />
      </a-form-item>
      <a-form-item v-show="verifyForm.type === 2" label="原邮箱地址：">
        <a-input v-model:value="oldEmailValue" disabled />
      </a-form-item>
      <a-form-item label="验证码：" name="code" v-bind="validateInfos.code">
        <div class="flexInput">
          <a-input v-model:value="verifyForm.code" />
          <a-button type="primary" :disabled="count === 0 ? false : true" @click="sendcode">{{
            codeDesc
          }}</a-button>
        </div>
        <span v-show="codeDescribe" class="c-desc">{{ codeDescribe }}</span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import {
    getEmailCodeApi,
    getSmsCodeApi,
    verifyCodeApi,
  } from '/@/api/systemSetting/accountManage/accountSet';
  import { Form, message } from 'ant-design-vue';
  import { computed, onUnmounted, reactive, ref, watch } from 'vue';

  type VerifyPropType = {
    oldMobile?: string;
    oldEmail?: string;
    modelValue: boolean;
  };
  type VerifyDataType = {
    type: number;
    code: string;
    email: string;
  };
  const options = [
    {
      label: '手机号验证',
      value: 1,
    },
    {
      label: '邮箱验证',
      value: 2,
    },
  ];
  const verifyForm = reactive<VerifyDataType>({
    code: '',
    email: '',
    type: 1,
  });
  let loading = ref(false);
  const props = withDefaults(defineProps<VerifyPropType>(), {
    oldMobile: '',
    modelValue: false,
    oldEmail: '',
  });
  const rules = ref<any>({
    type: [{ required: true, message: '请选择校验方式' }],
    code: [{ required: true, message: '请输入验证码' }],
  });
  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(verifyForm, rules);
  const emits = defineEmits(['update:modelValue', 'renderSetEmail']);
  const codeDescribe = ref('');
  const codeTimer = ref();
  const count = ref(0);

  const oldEmailValue = computed(() => props.oldEmail);
  const oldMobileValue = computed(() => props.oldMobile);

  const typeDisabeld = computed(() => {
    let val = oldMobileValue.value && oldEmailValue.value ? false : true;
    return val;
  });

  const codeDesc = computed(() => {
    if (count.value === 0) {
      return '获取验证码';
    } else {
      return count.value + '';
    }
  });
  watch(
    () => typeDisabeld.value,
    (cur) => {
      if (cur) {
        verifyForm.type = oldMobileValue.value ? 1 : 2;
      } else {
        verifyForm.type = 2;
      }
    }
  );
  const close = () => {
    resetFields();
    count.value = 0;
    codeDescribe.value = '';
    clearInterval(codeTimer.value);
    emits('update:modelValue', false);
  };
  const timeFunc = () => {
    count.value = 60;
    codeTimer.value = setInterval(() => {
      if (count.value > 0) {
        count.value--;
      } else {
        clearInterval(codeTimer.value);
      }
    }, 1000);
  };
  //发送验证码
  const sendcode = async () => {
    verifyForm.code = '';
    try {
      verifyForm.type === 1
        ? await getSmsCodeApi({ mobile: oldMobileValue.value, module: oldEmailValue.value ? 6 : 5 })
        : await getEmailCodeApi({ email: props.oldEmail, module: 1 });
      timeFunc();
      message.success('验证码已发送，请注意查收');
      codeDescribe.value = '验证码已发送，请注意查收！';
    } catch (error) {
      count.value = 0;
      clearInterval(codeTimer.value);
    }
  };
  //校验
  const verifyCode = () => {
    validate().then(async () => {
      try {
        loading.value = true;
        await verifyCodeApi({ type: verifyForm.type, code: verifyForm.code });
        emits('renderSetEmail', verifyForm.type);
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
