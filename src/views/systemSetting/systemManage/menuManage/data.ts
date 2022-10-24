/*
 * @Description: 菜单数据
 * @Autor: zwy
 * @Date: 2022-01-07 16:28:45
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-30 11:50:00
 */
export const columns = [
  {
    title: '菜单标题',
    dataIndex: 'title',
    key: 'title',
    align: 'left',
    width: 200,
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 80,
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    key: 'component',
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    key: 'permission',
  },
  {
    title: '是否显示',
    dataIndex: 'is_hidden',
    key: 'is_hidden',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'operations',
    key: 'operations',
    width: 200,
    // fixed: 'right',
  },
];
