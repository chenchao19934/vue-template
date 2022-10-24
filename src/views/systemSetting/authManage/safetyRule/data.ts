/*
 * @Description: 账号安全规则数据
 * @Autor: zwy
 * @Date: 2022-01-07 16:28:45
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 09:45:40
 */
export const columns = [
  {
    title: '账号安全规则名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '设备限制',
    dataIndex: 'equipment_type',
    key: 'equipment_type',
    helpMessage:
      '1、多设备同时登录：同一时间内允许登录不同设备或浏览器；<br />2、单设备登录：同一时间内只允许在同个设备及同个浏览器上登录；在其他设备或其他浏览器登录，则账号在原设备或原浏览器会自动登出；',
  },
  {
    title: '操作IP限制',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '描述',
    dataIndex: 'describe',
    key: 'describe',
  },
  {
    title: '操作人',
    dataIndex: 'customer_name',
    key: 'customer_name',
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
