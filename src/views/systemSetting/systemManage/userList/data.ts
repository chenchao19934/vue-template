/*
 * @Description: 用户列表数据
 * @Autor: zwy
 * @Date: 2022-01-07 16:28:45
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-10 09:23:07
 */
import { FormItemsType } from '/@/api/others/model/commonModel';
import { markRaw } from 'vue';
import { Input, Select } from 'ant-design-vue';

export const formItems: FormItemsType = {
  username: {
    label: '用户名',
    component: markRaw(Input),
    props: {
      placeholder: '请输入用户名或真实姓名',
      allowClear: true,
    },
  },
  status: {
    label: '状态',
    component: markRaw(Select),
    props: {
      placeholder: '请选择状态',
      options: [
        { label: '全部', value: '' },
        { label: '禁用', value: -1 },
        { label: '启用', value: 1 },
      ],
      allowClear: true,
    },
  },
  level: {
    label: '账号类型',
    component: markRaw(Select),
    props: {
      placeholder: '请选择账号类型',
      options: [
        { label: '主账号', value: 9 },
        { label: '子账号', value: -1 },
      ],
      allowClear: true,
    },
  },
};

export const columns = [
  {
    title: '用户编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '真实姓名',
    dataIndex: 'realname',
    key: 'realname',
  },
  {
    title: '账号类型',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作时间',
    dataIndex: 'modified',
    key: 'modified',
  },
  {
    title: '注册时间',
    dataIndex: 'created',
    key: 'created',
  },
  {
    title: '最后登录时间',
    dataIndex: 'last_login_time',
    key: 'last_login_time',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    key: 'operations',
    fixed: 'right',
    width: 100,
  },
];

export const logColumns = [
  {
    title: '设备',
    dataIndex: 'os',
    key: 'os',
    align: 'center',
  },
  {
    title: '登录时间',
    dataIndex: 'created',
    key: 'created',
    align: 'center',
  },
  {
    title: '登录IP',
    dataIndex: 'ip',
    key: 'ip',
    align: 'center',
  },
  {
    title: '登录区域',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
];
