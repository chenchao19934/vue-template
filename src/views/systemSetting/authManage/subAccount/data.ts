/*
 * @Description: 子账号列表数据
 * @Autor: zwy
 * @Date: 2022-01-07 16:28:45
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 15:12:11
 */
import { FormItemsType } from '/@/api/others/model/commonModel';
import { markRaw } from 'vue';
import { Input, Select } from 'ant-design-vue';

export const formItems: FormItemsType = {
  role_ids: {
    label: '角色',
    component: markRaw(Select),
    props: {
      placeholder: '请选择角色',
      allowClear: true,
      mode: 'multiple',
      showArrow: true,
      options: [],
    },
  },
  username: {
    label: '用户名',
    component: markRaw(Input),
    props: {
      placeholder: '请输入用户名或真实姓名',
      allowClear: true,
    },
  },
  order_by: {
    label: '排序方式',
    component: markRaw(Select),
    props: {
      placeholder: '请选择排序方式',
      allowClear: true,
      options: [
        { label: '按创建时间', value: 'created:desc' },
        { label: '按排序值', value: 'position:desc' },
      ],
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
    title: '角色',
    dataIndex: 'role_name',
    key: 'role_name',
  },
  {
    title: '真实姓名',
    dataIndex: 'realname',
    key: 'realname',
  },
  {
    title: '排序值',
    dataIndex: 'position',
    key: 'position',
    width: 80,
  },
  {
    title: '账号安全规则',
    dataIndex: 'safety_rule_name',
    key: 'safety_rule_name',
    width: 120,
  },
  {
    title: '常用登录地区',
    dataIndex: 'login_locations',
    key: 'login_locations',
    width: 120,
  },
  {
    title: '是否锁定',
    dataIndex: 'lock',
    key: 'lock',
    width: 90,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 60,
  },
  {
    title: '操作时间',
    dataIndex: 'modified',
    key: 'modified',
  },
  {
    title: '注册日期',
    dataIndex: 'created',
    key: 'created',
  },
  {
    title: '最后登录',
    dataIndex: 'last_login_time',
    key: 'last_login_time',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    key: 'operations',
    // fixed: 'right',
    width: 90,
  },
];
