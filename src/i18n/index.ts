import { fallbackLanguage } from '@/shared/supported-language';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import de from './translations/de.json';
import en from './translations/en.json';

Vue.use(VueI18n)

const messages = {
  de,
  en
};

export const i18n = new VueI18n({
  locale: fallbackLanguage,
  fallbackLocale: fallbackLanguage,
  messages
});

export default i18n;