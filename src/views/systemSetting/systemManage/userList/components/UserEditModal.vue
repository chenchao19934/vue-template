<!--
 * @Description: 用户列表-编辑用户弹窗
 * @Autor: zwy
 * @Date: 2021-11-29 16:32:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 10:13:07
-->
<template>
  <a-modal
    :visible="modelValue"
    title="编辑账号"
    :width="600"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    :confirmLoading="loading"
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
      <a-form-item label="用户编号：" name="customer_id">
        <a-input v-model:value="form.customer_id" disabled />
      </a-form-item>
      <a-form-item label="真实姓名：" name="realname" v-bind="validateInfos.realname">
        <a-input v-model:value="form.realname" allowClear />
      </a-form-item>
      <a-form-item label="账号等级：" name="level">
        <a-select v-model:value="form.level" disabled>
          <a-select-option :value="9">主账号</a-select-option>
          <a-select-option :value="1">子账号</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态：" name="status">
        <a-radio-group v-model:value="form.status">
          <a-radio :value="1">启用</a-radio>
          <a-radio :value="-1">禁用</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { updateAccountApi } from '/@/api/systemSetting/systemManage/userList';
  import { Form, message } from 'ant-design-vue';

  type BaseDrawerPropType = {
    modelValue: boolean; //显示抽屉
  };

  withDefaults(defineProps<BaseDrawerPropType>(), { modelValue: false });
  const emitEvents = defineEmits(['update:modelValue', 'query']);
  let loading = ref(false);
  const form = reactive({
    customer_id: -1,
    realname: '',
    level: 9,
    status: 1,
  });

  const rules = reactive({
    realname: [{ required: true, message: '请输入真实姓名' }],
  });
  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(form, rules);
  const clear = () => {
    resetFields();
  };
  const close = () => {
    clear();
    emitEvents('update:modelValue', false);
  };
  const submit = () => {
    validate()
      .then(() => {
        loading.value = true;
        return updateAccountApi(form);
      })
      .then(() => {
        message.success('用户信息编辑成功！');
        close();
        emitEvents('query');
        loading.value = false;
      });
  };
  const edit = ({ customer_id, realname, level, status }) => {
    form.customer_id = customer_id;
    form.realname = realname;
    form.level = level;
    form.status = status;
  };
  defineExpose({
    edit,
  });
</script>
