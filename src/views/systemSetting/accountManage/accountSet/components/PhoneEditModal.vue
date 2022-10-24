<!--
 * @Description: 修改绑定手机号
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 10:54:23
-->

<template>
  <a-modal
    :visible="modelValue"
    title="修改绑定手机号"
    :width="400"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    :confirmLoading="loading"
    @cancel="close"
    @ok="bindCellphone"
  >
    <a-form
      :model="mobileForm"
      autocomplete="off"
      layout="horizontal"
      :label-col="{ style: 'width: 110px' }"
      class="form-class"
    >
      <a-form-item v-show="oldMobileValue" label="原手机号码：" name="oldMobileValue">
        <a-input v-model:value="oldMobileValue" disabled />
      </a-form-item>
      <a-form-item label="手机号码：" name="mobile" v-bind="validateInfos.mobile">
        <a-input v-model:value="mobileForm.mobile" />
      </a-form-item>
      <a-form-item label="验证码：" name="code" v-bind="validateInfos.code">
        <div class="flexInput">
          <a-input v-model:value="mobileForm.code" />
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
  import { bindMobileApi, getSmsCodeApi } from '/@/api/systemSetting/accountManage/accountSet';
  import { Form, message } from 'ant-design-vue';
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
    oldMobile?: string;
    cellPhoneCheckType: number; //1手机号验证  2、邮箱验证
  };
  type CellPhoneDataType = {
    code: string;
    mobile: string;
  };
  const proxy = getCurrentInstance()?.proxy as ComponentPublicInstance<any>;
  const $bus = proxy.$bus;
  const props = withDefaults(defineProps<CellPhoneProType>(), {
    module: 2,
    modelValue: false,
    oldMobile: '',
    cellPhoneCheckType: 1,
  });
  const rules = ref<any>({
    mobile: [{ required: true, message: '请输入手机号' }],
    code: [{ required: true, message: '验证码不能为空' }],
  });
  const emit = defineEmits(['update:modelValue']);
  const mobileForm = reactive<CellPhoneDataType>({
    code: '',
    mobile: '',
  });
  const codeDescribe = ref('');
  const codeTimer = ref();
  const count = ref(0);
  let loading = ref(false);
  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(mobileForm, rules);

  const oldMobileValue = computed(() => props.oldMobile);
  const codeDesc = computed(() => {
    return count.value === 0 ? '获取验证码' : count.value + '';
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
    //手机号码没输入时不发请求
    try {
      const values = await validate('mobile');
      if (values && values.mobile) {
        try {
          mobileForm.code = '';
          await getSmsCodeApi({ mobile: mobileForm.mobile, module: 1 });
          count.value = 60;
          codeTimer.value = setInterval(() => {
            if (count.value > 0) {
              count.value--;
            } else {
              clearInterval(codeTimer.value);
            }
          }, 1000);
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
  const bindCellphone = () => {
    validate().then(async () => {
      loading.value = true;
      try {
        await bindMobileApi({
          module: oldMobileValue.value ? 2 : 1,
          type: props.cellPhoneCheckType || 1,
          code: mobileForm.code,
          mobile: mobileForm.mobile,
        });
        message.success('设置手机号码成功');
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
