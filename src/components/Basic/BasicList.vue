<!--
 * @Description: 列表封装
 * @Autor: zwy
 * @Date: 2021-12-21 09:29:50
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-30 11:31:48
-->

<template>
  <div class="mt-14px">
    <basic-query v-if="formItems" v-bind="formProps" @update-query-params="updateQueryParams" />
    <div v-if="Object.keys($slots).includes('btns')" class="page_operate l-flex-csb">
      <slot name="btns"></slot>
    </div>
    <div class="page_main">
      <a-table v-bind="tableProps" @change="onChange">
        <!-- 表头插槽 -->
        <template #headerCell="{ title, column }">
          <slot
            v-if="column.headerSlot && column.headerSlot.length > 0"
            :name="column.headerSlot"
            :col="column"
          ></slot>

          <span v-else>{{ title }}</span>
          <!-- 问号提示 -->
          <span v-if="column.helpMessage && column.helpMessage.length > 0">
            <a-tooltip placement="top">
              <template #title><div v-html="column.helpMessage"></div></template>
              <QuestionCircleOutlined style="color: rgba(153, 153, 153, 0.65); margin-left: 4px" />
            </a-tooltip>
          </span>
        </template>
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="!Object.keys($slots).includes(column.dataIndex)">
            {{ formatTable(column.dataIndex, text) }}
          </template>
          <!-- 内容插槽 -->
          <template v-for="slotName in Object.keys($slots)">
            <!-- 给插槽动态的绑定属性名称  并且把当前行的数据传递出去 接收的数据时名称也应为row -->
            <slot
              v-if="column.key === slotName"
              :name="slotName"
              :row="record"
              :text="text"
              :index="index"
            ></slot>
          </template>
        </template>
      </a-table>
    </div>
    <div v-if="hasPagination" class="page_bottom">
      <a-pagination v-model:current="queryForm.page" v-bind="pageProps" @change="search" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, toRaw, reactive, computed } from 'vue';
  import { formatTable, formatTree_v2 } from '/@/utils/common';
  import { cloneDeep } from 'lodash-es';

  type ListProps<T> = {
    columns: Array<T>; //表格列的配置描述
    bordered?: boolean; //是否展示外边框和列边框
    pagination?: boolean | object; //是否展示外边框和列边框
    size?: 'default' | 'middle' | 'small';
    showHeader?: boolean; //是否显示表头
    scroll?: object; //表格是否可滚动，也可以指定滚动区域的宽、高
    rowKey?: string; //行数据的 Key，用来优化 Table 的渲染,大部分是code,少部分是id
    selectable?: boolean; //是否可选择
    loading?: boolean;
    showSorterTooltip?: boolean; //表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性
    sticky?: boolean; //设置粘性头部和滚动条

    headerSlot?: string; //表头插槽名字
    helpMessage?: boolean | string; //表头是否有问号提示
    hasStatus?: boolean; //广告管理模块需要先判断状态才能做批量操作，所以需要抛出状态
    otherQueryParams?: object; //其他搜索参数-例如课程列表带状态
    customClass?: string[]; //表格自定义样式-例如课程列表、广告管理表格内边距与其他的不一致;表头颜色控制,例如首页表头不需要颜色
    apiName: Function; //获取表格数据接口
    isMenuData?: boolean; //后端返回数据格式特殊-菜单管理模块
    hasPagination?: boolean; //是否需要分页

    formItems?: object; //表单项配置
    initData?: object; //表单初始数据
  };

  //参数类型
  type ParamsType = {
    status?: number;
    level?: number;
  };

  const props = withDefaults(defineProps<ListProps<any>>(), {
    dataSource: () => [],
    bordered: false,
    rowKey: 'code',
    scroll: undefined,
    showHeader: true,
    selectable: false,
    showSorterTooltip: false,
    pagination: false,
    headerSlot: '',
    helpMessage: false,
    hasStatus: false,
    customClass: () => [],
    isMenuData: false,
    hasPagination: true,
    sticky: true,
  });

  let queryForm = reactive<any>({
    page: 1,
    page_size: 20,
    ...props.initData,
  });
  let loading = ref(false);
  const dataResult = ref<Array<any>>([]);
  const total = ref<number>(0);
  let checkedCodes = ref<string[]>([]); //获取选择的code
  let checkedStatus = ref<number[]>([]); //获取选择的状态
  let selectedKeys = ref<Array<string>>(); //选中项
  let selectionAttr = props.selectable ? 'row-selection' : '';

  //表头属性统一处理，文本居中
  const columnsList = computed(() => {
    let list = cloneDeep(props.columns);
    list.forEach((v) => {
      v.align = v.align ? v.align : 'center';
    });
    return list;
  });
  //表单属性
  const formProps = computed(() => {
    const { formItems, initData } = props;
    return { formItems, initData };
  });
  //表格属性
  const tableProps = computed(() => {
    const { rowKey, sticky, scroll, showSorterTooltip, pagination, customClass } = props;
    return {
      rowKey,
      sticky,
      scroll,
      showSorterTooltip,
      pagination,
      loading: loading.value,
      locale: {
        filterConfirm: '确定',
        filterReset: '重置',
        emptyText: '暂无数据',
      },
      dataSource: dataResult.value,
      columns: columnsList.value,
      class: [
        'list-table',
        'ant-table-striped',
        ...customClass,
        customClass.includes('noGrey') ? '' : 'headerColor',
      ],
      rowClassName: (_record, index) => (index % 2 === 1 ? 'table-striped' : null),
      [selectionAttr]: {
        selectedRowKeys: selectedKeys,
        onChange: onSelectChange,
        columnWidth: 60,
      },
    };
  });
  //分页属性
  const pageProps = computed(() => {
    return {
      total: total.value,
      size: 'small',
      showQuickJumper: true,
      showSizeChanger: true,
      defaultPageSize: 20,
      pageSizeOptions: ['20', '30', '50', '100'],
      showTotal: (total) => `共 ${total} 条`,
    };
  });

  const emitEvents = defineEmits(['getResData', 'getCheckedKeys', 'getFormParams']);

  const updateQueryParams = (params: object & { date: string[] }) => {
    queryForm = Object.assign(queryForm, params);
    queryForm.page = 1;
    queryForm.page_size = 20;
    //日期范围形式处理-【会员管理-会员列表,学习记录】【直播管理-直播列表】
    let attrs = Object.keys(params);
    attrs.forEach((v) => {
      //日期组件
      if (v.startsWith('dateCon-')) {
        const arr = v.split('-');
        queryForm[arr[1]] = params[v]?.length ? params[v][0] : '';
        queryForm[arr[2]] = params[v]?.length ? params[v][1] : '';
        delete queryForm[v];
      }
    });
    getTableList();
    emitEvents('getFormParams', params);
  };
  //清空选中项
  const clear = () => {
    selectedKeys.value = [];
    checkedCodes.value = [];
    checkedStatus.value = [];
    emitEvents('getCheckedKeys', []);
  };

  //获取表格数据
  const getTableList = () => {
    loading.value = true;
    clear();
    let queryParams: ParamsType & object = cloneDeep(queryForm);
    if (props.otherQueryParams && Object.keys(props.otherQueryParams).length) {
      //选全部则不传这个参数-额外查询参数
      if (queryParams.status === 0) {
        delete queryParams.status;
      }
    }
    props
      .apiName(queryParams)
      .then((data) => {
        dataResult.value = props.isMenuData
          ? formatTree_v2(data, 'pid', 0)
          : (data.list as Array<any>);
        if (props.hasPagination) {
          total.value = data.total as number;
        }
        emitEvents('getResData', data);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const onSelectChange = (selectedRowKeys: string[], selectedRows) => {
    //和上面联动
    selectedKeys.value = selectedRowKeys;
    //广告管理、课程管理上架/下架状态抛出
    checkedCodes.value = selectedRowKeys; //获取选中项方式一
    checkedStatus.value = props.hasStatus ? toRaw(selectedRows).map((item) => item.status) : [];
    emitEvents('getCheckedKeys', selectedRowKeys); //获取选中项方式二
  };

  //后端排序/分页
  const onChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    //php排序这种方式,java排序是另外一种~~~
    let sort = {};
    let sort_by = sorter.columnKey === 'head_watch' ? 'study_num_real' : sorter.columnKey;
    let sort_type = sorter.order == 'descend' ? 'desc' : sorter.order == 'ascend' ? 'asc' : '';
    if (sort_by && sort_type) {
      sort = {
        sort_type,
        sort_by,
      };
    }
    queryForm = Object.assign(queryForm, { sort });
    getTableList();
  };

  const search = (page: number, pageSize: number) => {
    queryForm.page = page;
    queryForm.page_size = pageSize;
    getTableList();
  };

  onMounted(() => {
    //刷新时
    getTableList();
  });

  defineExpose({
    getTableList,
    updateQueryParams,
    checkedStatus,
    checkedCodes,
    total,
    queryForm,
  });
</script>
<style scoped lang="scss">
  .page_bottom {
    position: fixed;
    background-color: #fff;
    bottom: 60px;
    height: 74px;
    line-height: 74px;
    padding-right: 18px;
    width: calc(100% - 40px);
    z-index: 99;

    ul {
      padding: 20px 0 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }

  .ant-table-striped {
    &:deep(.table-striped) td {
      background-color: #fafafa;
    }

    &:deep(.ant-table-tbody) > tr > td {
      padding: 12px 16px;
    }

    &:deep(.ant-table-column-sorter-down.active),
    &:deep(.ant-table-column-sorter-up.active) {
      color: $primaryColor;
    }
  }
  //课程列表、广告管理表格内边距与其他的不一致
  .customPadding {
    &:deep(.ant-table-tbody) > tr > td {
      padding: 6px 16px;
    }
  }
</style>
