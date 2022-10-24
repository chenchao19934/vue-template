<!--
 * @Description: 批量修改角色弹窗
 * @Autor: zwy
 * @Date: 2022-01-27 09:29:59
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 15:19:05
-->

<template>
  <a-modal
    :visible="modelValue"
    title="批量修改角色"
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
      <a-form-item label="角色：" name="role_ids" v-bind="validateInfos.role_ids">
        <a-select
          v-model:value="form.role_ids"
          placeholder="请至少选择一个角色"
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
  import { Role } from '/@/api/systemSetting/authManage/model/roleListModel';
  import { getAllRolesApi } from '/@/api/systemSetting/authManage/roleList';
  import { batchEditRoleApi } from '/@/api/systemSetting/authManage/subAccount';
  import { Form, message } from 'ant-design-vue';

  interface ModalType {
    modelValue: boolean;
    chkedIds: number[];
  }

  const props = withDefaults(defineProps<ModalType>(), { modelValue: false });
  let roleList = ref<Role[]>([]);
  let loading = ref(false);
  const form = reactive<{
    role_ids: number | undefined;
  }>({
    role_ids: undefined,
  });
  const rules = reactive({
    role_ids: [{ required: true, message: '请至少选择一个角色' }],
  });
  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(form, rules);

  const emitEvents = defineEmits(['query', 'update:modelValue']);

  const close = () => {
    resetFields();
    emitEvents('update:modelValue', false);
  };
  const submit = () => {
    validate().then(async () => {
      try {
        loading.value = true;
        let params = {
          role_ids: form.role_ids ? [form.role_ids] : [],
          customer_ids: props.chkedIds,
        };
        await batchEditRoleApi(params);
        emitEvents('query');
        close();
        message.success('批量修改角色成功！');
      } finally {
        loading.value = false;
      }
    });
  };
  //获取角色列表
  const getRoleList = async () => {
    const data = await getAllRolesApi();
    // console.log('role9999', JSON.stringify(data));
    roleList.value = data;
  };
  onMounted(() => {
    getRoleList();
  });
</script>
