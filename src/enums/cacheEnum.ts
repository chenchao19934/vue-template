/*
 * @Description: 全局枚举类型
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-15 16:07:53
 */
// token key
export const TOKEN_KEY = 'TOKEN__';
export const TOKEN__EXPIRY__KEY = 'TOKEN__EXPIRY';

export const LOCALE_KEY = 'LOCALE__';

// user info key
export const USER_INFO_KEY = 'USER__INFO__';

// role info key
export const ROLES_KEY = 'ROLES__KEY__';

// project config key
export const PROJ_CFG_KEY = 'PROJ__CFG__KEY__';

// lock info
export const LOCK_INFO_KEY = 'LOCK__INFO__KEY__';

export const MULTIPLE_TABS_KEY = 'MULTIPLE_TABS__KEY__';

export const APP_DARK_MODE_KEY_ = '__APP__DARK__MODE__';

// base global local key
export const APP_LOCAL_CACHE_KEY = 'COMMON__LOCAL__KEY__';

// base global session key
export const APP_SESSION_CACHE_KEY = 'COMMON__SESSION__KEY__';

//设置在线时长
export const APP_ONLINE_HOUR = 'APP_ONLINE_HOUR';

export const LAST_CLICK_TIME = 'LAST_CLICK_TIME__';

export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
