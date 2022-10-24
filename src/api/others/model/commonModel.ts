/*
 * @Description: 公共数据模型
 * @Autor: zwy
 * @Date: 2021-12-22 10:12:28
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-28 21:19:45
 */

import { Ref } from 'vue';

//批量操作-入参
export interface BatchParams {
  type?: string; //操作类型:del删除  off下架  on上架
  codes?: string[]; //编码
}

//表单保存函数-入参
export interface SaveDataParams {
  // validate: Function
  formEl?: Ref; //表单ref
  loading: Ref; //loading
  params: any; //入参
  editFunc: Function; //编辑下发接口
  addFunc: Function; //添加下发接口
  editMsg: string; //编辑成功信息
  addMsg: string; //添加成功信息
  emitEvents: Function; //emit函数-关闭弹窗，查询表格
  addAndEditDeal?: Function; //验证通过后-编辑和新增 参数处理
  addDeal?: Function; //验证通过后-新增 参数处理
  editDeal?: Function; //验证通过后-编辑 参数处理
  clear?: Function; //清理
}

export type Rule = object & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};
// 基础表单属性
export type OptionsType = {
  label?: string | undefined;
  value?: string | number | undefined;
};
export type BasicPropsType = {
  placeholder?: string | string[];
  options?: Array<OptionsType>;
  style?: string;
  allowClear?: boolean;
  showSearch?: boolean;
  treeNodeFilterProp?: string;
  dropdownstyle?: object;
  fieldNames?: object;
  treeDefaultExpandAll?: boolean;
  getPopupContainer?: Function;
  treeData?: Array<any>;
  mode?: 'multiple' | 'tags' | 'combobox';
  showTime?: boolean | object;
  format?: string;
  valueFormat?: string;
  showArrow?: boolean;
};
export type basicProps = {
  label?: string;
  component: any;
  props?: BasicPropsType;
};
export type FormItemsType = {
  [propName: string]: basicProps;
};
export type ListItemType = {
  type?: string;
  top?: string;
  bottom?: string;
  bottomPopContent?: string;
  right?: string;
};
export interface BasicPageParams {
  page_size?: number;
  page?: number;
}

// 列表页码
export interface BasicPaginationModel {
  page: number;
  page_size: number;
  layout?: string;
  total: number;
}
