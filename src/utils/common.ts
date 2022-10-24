/*
 * @Description:  通用方法封装
 * @Autor: zwy
 * @Date: 2021-12-22 17:48:34
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-28 22:04:46
 */

import { message } from 'ant-design-vue';
import { SaveDataParams } from '/@/api/others/model/commonModel';
import { MenuModel } from '/@/api/others/model/menuModel';

/**
 * @description: 表单保存函数封装
 * @param {*}
 *  loading: Ref, //loading
 *  params: any, //入参
 *  editFunc: Function, //编辑下发接口
 *  addFunc: Function, //添加下发接口
 *  editMsg: string, //编辑成功信息
 *  addMsg: string, //添加成功信息
 *  emitEvents: Function, //edmit函数-关闭弹窗，查询表格
 *  addAndEditDeal?: Function, //验证通过后-编辑和新增 参数处理
 *  addDeal?: Function, //验证通过后-新增 参数处理
 *  editDeal?: Function, //验证通过后-编辑 参数处理
 *  clear?: Function //关闭前的清理函数
 * @return {*}
 * @author: zwy
 */
export const saveData = async (_: SaveDataParams) => {
  _.loading.value = true;
  try {
    let msg = '';
    _.addAndEditDeal && _.addAndEditDeal(_.params);
    //唯一值，大部分为code，少部分为id
    if (_.params.code || _.params.id) {
      //编辑
      _.editDeal && _.editDeal(_.params);
      await _.editFunc(_.params);
      msg = _.editMsg;
    } else {
      //新增
      _.addDeal && _.addDeal(_.params);
      await _.addFunc(_.params);
      msg = _.addMsg;
    }
    message.success(msg);
    _.clear && _.clear();
    _.emitEvents('update:modelValue', false);
    _.emitEvents('query');
  } finally {
    _.loading.value = false;
  }
};
/**
 * @description: 表格字典值转换
 * @param {string} dataIndex
 * @param {string} record
 * @return {*}
 * @author: zwy
 */
export const formatTable = (dataIndex: string, record: string | number | string[]) => {
  if (dataIndex === 'level') {
    return record === 9 ? '主账号' : '子账号';
  } else if (dataIndex === 'status') {
    //【用户列表】——登录日志-登录状态
    return record === 1 ? '登录成功' : '登录失败';
  } else {
    return record;
  }
};

// 给路由权限用会去掉is_hidden和btn的按钮
export function formatTree(data: any[], pidName: string, rootPid: number) {
  if (data) {
    const root: Array<MenuModel> = [];
    const idMapping: { [key: string]: number } = data.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});
    data.forEach((el) => {
      // 判断根节点
      if (el[pidName] === rootPid) {
        root.push(el);
        return;
      }
      // 用映射表找到父元素
      const parentEl = data[idMapping[el[pidName]]];
      if (parentEl && el.is_hidden == -1 && el.type == 2) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    });
    return root;
  } else {
    return [];
  }
}
//
export function formatTree_v2(data: any[], pidName: string, rootPid: number) {
  if (data) {
    const root: Array<any> = [];
    const idMapping: { [key: string]: number } = data.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});
    data.forEach((el) => {
      // 判断根节点
      if (el[pidName] === rootPid) {
        root.push(el);
        return;
      }
      // 用映射表找到父元素
      const parentEl = data[idMapping[el[pidName]]];
      if (parentEl) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    });
    return root;
  } else {
    return [];
  }
}
