import { createI18n } from 'vue-i18n';
import en from './lang/en';
import cn from './lang/cn';

export const i18n = createI18n({
  legacy: false, //Composition API mode
  locale: 'cn', //本地使用语言
  fallbackLocale: 'en', //默认的语言
  globalInjection: true,
  messages: {
    en,
    cn,
  },
});

export const t = i18n.global.t;
