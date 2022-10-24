<!--
 * @Description: 批量设置账号安全规则弹窗
 * @Autor: zwy
 * @Date: 2021-11-29 16:32:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 18:11:55
-->
<template>
  <a-modal
    :visible="modelValue"
    title="批量设置账号安全规则"
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
      :label-col="{ style: 'width: 160px' }"
      class="form-class"
    >
      <a-form-item
        label="账号安全规则："
        name="safety_rule_id"
        v-bind="validateInfos.safety_rule_id"
      >
        <a-select
          v-model:value="form.safety_rule_id"
          placeholder="请选择账号安全规则"
          style="width: 320px"
        >
          <a-select-option v-for="item in roleList" :key="item.id" :value="item.id">{{
            item.name
          }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { getAllRulesApi } from '/@/api/systemSetting/authManage/safetyRule';
  import { batchEditSafetyRuleApi } from '/@/api/systemSetting/authManage/subAccount';

  import { Form, message } from 'ant-design-vue';

  interface ModalType {
    modelValue: boolean;
    chkedIds: number[];
  }

  const props = withDefaults(defineProps<ModalType>(), { modelValue: false });
  let loading = ref(false);
  const roleList = ref<any[]>([]);
  const form = reactive<{
    safety_rule_id: number | undefined;
  }>({
    safety_rule_id: undefined,
  });
  const rules = reactive({
    safety_rule_id: [{ required: true, message: '请选择账号安全规则' }],
  });

  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(form, rules);

  const emitEvents = defineEmits(['query', 'update:modelValue']);

  const close = () => {
    resetFields();
    emitEvents('update:modelValue', false);
  };
  //获取规则列表
  const getRulesList = async () => {
    const data = await getAllRulesApi();
    roleList.value = data?.list;
  };
  const submit = () => {
    validate().then(async () => {
      try {
        loading.value = true;
        let params = {
          safety_rule_id: form.safety_rule_id,
          customer_ids: props.chkedIds,
        };
        await batchEditSafetyRuleApi(params);
        emitEvents('query');
        close();
        message.success('批量修改安全规则成功！');
      } finally {
        loading.value = false;
      }
    });
  };
  onMounted(() => {
    getRulesList();
  });
</script>
