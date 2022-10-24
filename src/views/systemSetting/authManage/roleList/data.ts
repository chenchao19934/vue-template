/*
 * @Description: 角色权限数据
 * @Autor: zwy
 * @Date: 2022-01-07 16:28:45
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-10 09:21:57
 */
import { FormItemsType } from '/@/api/others/model/commonModel';
import { markRaw } from 'vue';
import { Input } from 'ant-design-vue';

export const formItems: FormItemsType = {
  name: {
    label: '角色名称',
    component: markRaw(Input),
    props: {
      placeholder: '请输入角色名称',
      allowClear: true,
    },
  },
};

export const columns = [
  {
    title: '角色',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '操作时间',
    dataIndex: 'modified',
    key: 'modified',
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    key: 'created',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    key: 'operations',
    fixed: 'right',
  },
];
