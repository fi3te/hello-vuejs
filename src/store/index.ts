import { i18n } from '@/i18n';
import { fallbackLanguage, SupportedLanguage, supportedLanguages } from '@/shared/supported-language';
import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';

import { RootState } from './model';
import entries from './modules/entries';

Vue.use(Vuex)

export const USE_BROWSER_LANGUAGE = 'USE_BROWSER_LANGUAGE';
export const USE_LANGUAGE = 'USE_LANGUAGE';

export default new Vuex.Store<RootState>({
  state: {
    language: fallbackLanguage
  },
  mutations: {
    [USE_LANGUAGE](state, language: SupportedLanguage) {
      state.language = language;
    }
  },
  actions: {
    [USE_BROWSER_LANGUAGE]({ dispatch }) {
      let languageCode = navigator.language;
      if (languageCode && languageCode.length > 2) {
        languageCode = languageCode.slice(0, 2);
      }
      if ((supportedLanguages as ReadonlyArray<string>).indexOf(languageCode) > -1) {
        dispatch(USE_LANGUAGE, languageCode as SupportedLanguage);
      } else {
        dispatch(USE_LANGUAGE, fallbackLanguage);
      }
    },
    [USE_LANGUAGE]({ commit }, language: SupportedLanguage) {
      moment.locale(language);
      i18n.locale = language;
      commit(USE_LANGUAGE, language);
    }
  },
  modules: {
    entries
  }
})
