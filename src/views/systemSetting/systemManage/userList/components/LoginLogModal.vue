<!--
 * @Description: 登录日志-弹窗
 * @Autor: zwy
 * @Date: 2022-02-08 19:25:29
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-10 18:35:09
-->

<template>
  <a-modal
    :visible="modelValue"
    title="登录日志"
    :width="800"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    @cancel="close"
  >
    <BasicTable
      :dataSource="dataList"
      size="small"
      :columns="logColumns"
      rowKey="id"
      :loading="loading"
    />
    <div class="pagination-con">
      <a-pagination
        v-model:current="pagination.page"
        :total="pagination.total"
        :pageSizeOptions="['5', '10', '20', '50']"
        :defaultPageSize="5"
        :show-total="(total) => `共 ${total} 条`"
        size="small"
        show-quick-jumper
        show-size-changer
        @change="changePage"
      />
    </div>
    <template #footer>
      <a-button key="back" @click="close">关闭</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  import { logColumns } from '../data';
  import { BasicPaginationModel } from '/@/api/others/model/commonModel';
  import { ref, reactive } from 'vue';
  import { getLoginLogApi } from '/@/api/systemSetting/systemManage/userList';

  interface ModalType {
    modelValue: boolean;
  }

  type Logger = {
    id: number;
    group_id: number;
    customer_id: number;
    ip: string;
    location: string;
    os: string;
    browser: string;
    module: number;
    response_data: string;
    status: number;
    created: string;
  };

  withDefaults(defineProps<ModalType>(), { modelValue: false });
  const emitEvents = defineEmits(['update:modelValue']);

  const dataList = ref<Logger[]>([]);
  const customer_id = ref<number>(-1);
  let pagination = reactive<BasicPaginationModel>({
    page: 1,
    page_size: 5,
    total: 0,
  });
  let loading = ref(false);

  const close = () => {
    pagination = {
      page: 1,
      page_size: 5,
      total: 0,
    };
    emitEvents('update:modelValue', false);
  };

  const query = () => {
    loading.value = true;
    getLoginLogApi({
      customer_id: customer_id.value,
      page: pagination.page,
      page_size: pagination.page_size,
    }).then((data) => {
      // console.log('iiiiii', JSON.stringify(data));
      loading.value = false;
      dataList.value = data.list;
      pagination.total = data.total;
    });
  };

  const logger = (id: number) => {
    customer_id.value = id;
    query();
  };

  const changePage = (page: number, pageSize: number) => {
    pagination.page = page;
    pagination.page_size = pageSize;
    query();
  };

  defineExpose({
    logger,
  });
</script>
<style lang="scss">
  .pagination-con {
    background-color: #fff;

    ul {
      padding: 20px 0 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }
</style>
