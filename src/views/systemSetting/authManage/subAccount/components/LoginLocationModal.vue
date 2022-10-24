<!--
 * @Description: 常用登录地区弹窗
 * @Autor: zwy
 * @Date: 2022-01-27 09:29:59
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 10:24:09
-->

<template>
  <a-modal
    :visible="modelValue"
    title="编辑常用登录地区"
    :width="400"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    @cancel="close"
  >
    <BasicTable :dataSource="dataSource" :columns="columns">
      <template #operations="{ row, index }">
        <div class="btn-opera" @click="handleDel(row, index)">删除</div>
      </template>
    </BasicTable>
    <template #footer>
      <a-button key="back" @click="close">关闭</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { SubAccount } from '/@/api/systemSetting/authManage/model/subAccountModel';
  import { deleteLoginLocationApi } from '/@/api/systemSetting/authManage/subAccount';
  import { message } from 'ant-design-vue';

  interface ModalType {
    modelValue: boolean;
  }
  type DataType = {
    location: string;
  };

  withDefaults(defineProps<ModalType>(), { modelValue: false });

  const columns = [
    {
      title: '常用登录地区',
      dataIndex: 'location',
      key: 'location',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      align: 'center',
    },
  ];
  let customer_id = -1;
  const locations = ref<string[]>([]);
  const emitEvents = defineEmits(['update:modelValue']);

  const dataSource = computed(() => {
    return locations.value.map((v) => {
      return {
        location: v,
      };
    });
  });

  const close = () => {
    emitEvents('update:modelValue');
  };
  const handleDel = async (loc: DataType, index: number) => {
    await deleteLoginLocationApi({ customer_id, login_location: loc.location });
    locations.value.splice(index, 1);
    message.success('删除常用登录地区成功！');
  };
  const show = (acc: SubAccount) => {
    customer_id = acc.id || -1;
    locations.value = acc.login_locations || [];
  };
  defineExpose({
    show,
  });
</script>
