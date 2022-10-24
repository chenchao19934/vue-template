<!--
 * @Description: 修改登录保持时间
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 14:16:44
-->

<template>
  <a-modal
    title="修改登录保持时间"
    :visible="modelValue"
    :width="600"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    :confirmLoading="loading"
    @cancel="close"
    @ok="setOnlineTime"
  >
    <a-form
      :model="timeForm"
      autocomplete="off"
      layout="horizontal"
      :label-col="{ style: 'width: 110px' }"
      class="form-class"
    >
      <a-form-item label="登录保持时间：" name="hours" v-bind="validateInfos.hours">
        <a-input-number id="inputNumber" v-model:value="timeForm.hours" :min="1" :max="12" /> 小时
      </a-form-item>
    </a-form>
    <div class="ml-110px">
      <p class="_text-info">1.超过该时间系统会退出登录，默认为2小时</p>
      <p class="_text-info">2.范围大于等于1小时，小于等于12小时，不可输入非整数</p>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { resetOnLineTimeApi } from '/@/api/systemSetting/accountManage/accountSet';
  import { ComponentPublicInstance, getCurrentInstance, reactive, ref, watch } from 'vue';
  import { Form, message } from 'ant-design-vue';

  type TimeProType = {
    modelValue: boolean;
    initHours: number;
  };
  type TimeDataType = {
    hours: number;
  };
  const timeForm = reactive<TimeDataType>({
    hours: 0,
  });
  let loading = ref(false);
  const validateHour = (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请输入时长');
      }
      if (value > 12) {
        reject('最长保持时间不超过12小时');
      } else if (value < 0 || !value) {
        reject('请输入正确的数值');
      } else {
        resolve('');
      }
    });
  };
  const rules = ref<any>({
    hours: [{ required: true, validator: validateHour }],
  });
  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(timeForm, rules);

  const props = withDefaults(defineProps<TimeProType>(), { modelValue: false, initHours: 0 });

  const proxy = getCurrentInstance()?.proxy as ComponentPublicInstance<any>;
  const $bus = proxy.$bus;
  watch(
    () => props.initHours,
    (curr, _) => {
      if (curr) {
        timeForm.hours = curr;
      }
    },
    { immediate: true }
  );
  const emit = defineEmits(['update:modelValue']);

  const close = () => {
    resetFields();
    emit('update:modelValue', false);
  };
  const setOnlineTime = () => {
    validate().then(async () => {
      try {
        loading.value = true;
        await resetOnLineTimeApi(timeForm.hours);
        message.success('重设成功');
        $bus.emit('updateAccountInfo');
        close();
      } finally {
        loading.value = false;
      }
    });
  };
</script>

<style scoped lang="scss">
  ._text-info {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    line-height: 18px;
  }
</style>
