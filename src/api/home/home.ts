import { http } from '/@/utils/http/axios';

export const getLoginHistory = () => {
  return http.get({ url: '/api/member/ucp/login/history' });
};
