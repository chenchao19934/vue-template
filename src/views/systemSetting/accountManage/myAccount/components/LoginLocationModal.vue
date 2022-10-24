<!--
 * @Description: 我的账号-编辑登录地区弹窗
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-16 18:03:50
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
    <BasicTable :dataSource="data" :columns="columns">
      <template #operations="{ row }">
        <div class="btn-opera" @click="delLocation(row)">删除</div>
      </template>
    </BasicTable>
    <template #footer>
      <a-button key="back" @click="close">关闭</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  import { deleteLoginLocationApi } from '/@/api/systemSetting/accountManage/myAccount';
  import { message } from 'ant-design-vue';

  type ProType<T> = {
    modelValue: boolean;
    data: Array<T>;
    customerId: number | undefined;
  };
  type DataType = {
    location: string;
    id: string;
  };
  const props = withDefaults(defineProps<ProType<DataType>>(), { modelValue: false });
  const emit = defineEmits(['update:modelValue', 'delData']);
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
  const close = () => {
    emit('update:modelValue');
  };
  const delLocation = async (locationInfo: DataType) => {
    await deleteLoginLocationApi({
      customer_id: props?.customerId,
      login_location: locationInfo?.location,
    });
    message.success('删除成功');
    emit('delData', locationInfo);
  };
</script>
