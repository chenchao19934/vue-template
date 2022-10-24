<!--
 * @Description: 表格封装-antd
 * @Autor: zwy
 * @Date: 2022-01-07 10:01:00
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-09 17:21:57
-->
<template>
  <a-table v-bind="{ ...$attrs, ...$props, ...tableProps }" @change="handleChange">
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
          <template #title> <div v-html="column.helpMessage"></div></template>
          <QuestionCircleOutlined style="color: rgba(153, 153, 153, 0.65); margin-left: 4px" />
        </a-tooltip>
      </span>
    </template>
    <template #bodyCell="{ text, record, index, column }">
      <template v-if="!Object.keys($slots).includes(column.dataIndex)">
        {{ formatTable(column.dataIndex, text) }}</template
      >
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
</template>

<script setup lang="ts">
  import { ref, toRaw, computed } from 'vue';
  import { formatTable } from '/@/utils/common';
  import { CourseType } from '/@/api/model/common';
  import { cloneDeep } from 'lodash-es';
  type TableProps<T> = {
    dataSource: Array<T>; //表格数据
    columns: Array<T>; //表格列的配置描述
    bordered?: boolean; //是否展示外边框和列边框
    pagination?: boolean | object; //是否展示分页
    size?: 'default' | 'middle' | 'small';
    showHeader?: boolean; //是否显示表头
    loading?: boolean;
    scroll?: object; //表格是否可滚动，也可以指定滚动区域的宽、高
    rowKey?: string; //行数据的 Key，用来优化 Table 的渲染,大部分是code,少部分是id
    selectable?: boolean; //是否可选择-eg: 【广告管理】-直播详情页广告管理
    showSorterTooltip?: boolean; //表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性
    sticky?: boolean; //设置粘性头部和滚动条

    headerSlot?: string; //表头插槽名字
    helpMessage?: boolean | string; //表头是否有问号提示
    hasStatus?: boolean; //广告管理模块需要先判断状态才能做批量操作，所以需要抛出状态
    customClass?: string[]; //表格自定义样式-例如课程列表、广告管理表格内边距与其他的不一致
    needName?: boolean; //广告管理-直播详情需要课程列表
  };
  type Key = string | number;

  const props = withDefaults(defineProps<TableProps<any>>(), {
    dataSource: () => [],
    bordered: false,
    rowKey: 'code',
    showHeader: true,
    selectable: false,
    headerSlot: '',
    helpMessage: false,
    showSorterTooltip: false,
    hasStatus: false,
    customClass: () => [],
    size: 'default',
    loading: false,
    scroll: undefined,
    pagination: false,
    sticky: true,
  });

  //表头属性统一处理，居中
  const columnsList = computed(() => {
    let list = cloneDeep(props.columns);
    list.forEach((v) => {
      // v.resizable = true;
      v.align = v.align ? v.align : 'center';
    });
    return list;
  });
  const emitEvents = defineEmits(['handleChange', 'getCheckedKeys']);

  let checkedCodes = ref<string[]>([]); //获取选择的code
  let nameList = ref<Array<CourseType>>([]); //获取选择的课程列表
  let selectedKeys = ref<Array<Key>>();
  let selectionAttr = props.selectable ? 'row-selection' : '';

  //表格属性
  const tableProps = computed(() => {
    const { customClass } = props;
    return {
      columns: columnsList.value,
      locale: {
        filterConfirm: '确定',
        filterReset: '重置',
        emptyText: '暂无数据',
      },
      class: [
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

  const onSelectChange = (selectedRowKeys: string[], selectedRows) => {
    console.log('ddd', selectedRows);
    selectedKeys.value = selectedRowKeys;
    nameList.value = props.needName
      ? toRaw(selectedRows).map((item) => {
          return {
            code: item.code,
            name: item.name,
          };
        })
      : [];
    checkedCodes.value = selectedRowKeys;
    emitEvents('getCheckedKeys', selectedRowKeys);
  };
  //清空选中项
  const clear = () => {
    selectedKeys.value = [];
    checkedCodes.value = [];
    nameList.value = [];
    emitEvents('getCheckedKeys', []);
  };
  //后端排序
  const handleChange = (pagination, filters, sorter) => {
    //php排序这种方式
    let sort = {};
    let sort_by = sorter.columnKey === 'head_watch' ? 'study_num_real' : sorter.columnKey;
    let sort_type = sorter.order == 'descend' ? 'desc' : sorter.order == 'ascend' ? 'asc' : '';
    if (sort_by && sort_type) {
      sort = {
        sort_type,
        sort_by,
      };
    }
    //java排序是另外一种~~~
    emitEvents('handleChange', sort);
  };
  defineExpose({
    checkedCodes,
    nameList,
    clear,
  });
</script>
<style lang="scss" scoped>
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

  :deep(.ant-btn:focus),
  :deep(.ant-btn:hover) {
    border-color: $primaryColor;
    color: $primaryColor;
  }
</style>
