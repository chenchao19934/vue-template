/*
 * @Description: 系统设置-权限管理-账号安全规则
 * @Autor: zwy
 * @Date: 2022-02-15 10:20:44
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 15:52:31
 */
// 账号安全规则
import { http } from '/@/utils/http/axios';
import { BasicPageParams } from '/@/api/others/model/commonModel';
import { SafetyRule } from './model/safetyRuleModel';

// 添加
type addParams = {} & SafetyRule;
export const addRuleApi = (data: addParams) => {
  return http.post({
    url: '/api/member/safety/rule/addition',
    data: data,
  });
};

// 更新
type updateParams = {} & SafetyRule;
export const updateRuleApi = (data: updateParams) => {
  return http.post({
    url: `/api/member/safety/rule/modification`,
    data: data,
  });
};

// 删除
export const deleteRuleApi = (id: number) => {
  return http.delete({
    url: `/api/member/safety/rule/deletion?id=${id}`,
  });
};

// 详情
export const getRuleDetailApi = (id: number) => {
  return http.get({
    url: `/api/member/safety/rule/fetch?id=${id}`,
  });
};

// 列表
export const getRuleListApi = (data: BasicPageParams) => {
  return http.post({
    url: `/api/member/safety/rule/page`,
    params: data,
  });
};

// 列表
export const getAllRulesApi = () => {
  return http.get({
    url: `/api/member/ucp/safety/rule/list`,
  });
};
