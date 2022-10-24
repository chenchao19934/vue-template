<!--
 * @Description: 新增编辑规则
 * @Autor: zwy
 * @Date: 2022-01-27 17:19:21
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 16:40:08
-->

<template>
  <a-modal
    :visible="modelValue"
    :title="title"
    :width="600"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    okText="保存"
    :confirmLoading="loading"
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
      <a-form-item label="账号安全规则名称：" name="name" v-bind="validateInfos.name">
        <a-input v-model:value="form.name" allowClear :maxlength="30" />
      </a-form-item>
      <a-form-item label="描述：" name="describe">
        <a-textarea v-model:value="form.describe" :rows="3" :maxlength="200" showCount />
      </a-form-item>
      <a-form-item name="equipment_type" v-bind="validateInfos.equipment_type">
        <template #label>
          <span>设备限制&nbsp;</span>
          <a-popover :width="420" placement="topLeft" title="说明">
            <template #content>
              <div style="text-align: justify; font-size: 13px"
                >1、多设备同时登录：同一时间内允许登录不同设备或浏览器；<br />2、单设备登录：同一时间内只允许在同个设备及同个浏览器上登录；在其他设备或其他浏览器登录，则账号在原设备或原浏览器会自动登出；</div
              >
            </template>
            <i class="el-icon-question _text-bmc"></i>
          </a-popover>
          <span>：</span>
        </template>
        <a-radio-group v-model:value="form.equipment_type">
          <a-radio :value="1">多设备同时登录</a-radio>
          <a-radio :value="2">单设备登录<span class="_text-danger">（推荐）</span></a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="操作IP限制：" name="ip_type" v-bind="validateInfos.ip_type">
        <a-radio-group v-model:value="form.ip_type">
          <a-radio :value="1">不限IP</a-radio>
          <a-radio :value="2">仅限IP白名单</a-radio>
        </a-radio-group>
        <a-textarea
          v-show="form.ip_type === 2"
          v-model:value="form.ip"
          :rows="3"
          placeholder="输入允许登录、操作的IP或IP区间，格式如：123.456.759.111 ；用换行隔开"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { SafetyRule } from '/@/api/systemSetting/authManage/model/safetyRuleModel';
  import {
    updateRuleApi,
    addRuleApi,
    getRuleDetailApi,
  } from '/@/api/systemSetting/authManage/safetyRule';
  import { Form, message } from 'ant-design-vue';

  interface ModalType {
    modelValue: boolean;
  }

  withDefaults(defineProps<ModalType>(), { modelValue: false });

  const isEdit = ref<boolean>(false);
  const title = ref<string>('');
  let loading = ref(false);
  const form = reactive<SafetyRule>({
    name: '',
    describe: '',
    equipment_type: 2,
    ip_type: 1,
    ip: '',
  });
  const rules = reactive({
    name: [{ required: true, message: '请输入规则名称' }],
    equipment_type: [{ required: true, message: '请选择设备限制类型' }],
    ip_type: [{ required: true, message: '请选择IP限制类型' }],
  });

  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(form, rules);
  const emits = defineEmits(['query', 'update:modelValue']);

  const close = () => {
    resetFields();
    emits('update:modelValue', false);
  };

  // 添加规则方法
  const add = () => {
    title.value = '新增账号安全规则';
    isEdit.value = false;
  };
  const edit = async (id: number) => {
    title.value = '编辑账号安全规则';
    isEdit.value = true;
    const rule = await getRuleDetailApi(id);
    // console.log('rule000000000', JSON.stringify(rule));
    form.id = rule.id;
    form.name = rule.name;
    form.describe = rule.describe;
    form.equipment_type = rule.equipment_type;
    form.ip_type = rule.ip_type;
    form.ip = rule.ip;
  };
  const submit = () => {
    validate().then(async () => {
      try {
        loading.value = true;
        isEdit.value ? await updateRuleApi(form) : await addRuleApi(form);
        close();
        emits('query');
        message.success(`账号安全规则${isEdit.value ? '修改' : '添加'}成功！`);
      } finally {
        loading.value = false;
      }
    });
  };

  defineExpose({
    add,
    edit,
  });
</script>
