import { i18n } from '@/i18n';
import { fallbackLanguage, SupportedLanguage, supportedLanguages } from '@/shared/supported-language';
import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';

import { Entry, NewEntry, OldEntry } from './../shared/entry';

Vue.use(Vuex)


export const ADD_NEW_ENTRY = 'ADD_NEW_ENTRY';
export const ADD_OLD_ENTRY = 'ADD_OLD_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const USE_BROWSER_LANGUAGE = 'USE_BROWSER_LANGUAGE';
export const USE_LANGUAGE = 'USE_LANGUAGE';

const generateId = (): number => {
  return new Date().getTime()
};

interface StoreModel {
  entries: Entry[];
  language: SupportedLanguage;
}

export default new Vuex.Store<StoreModel>({
  state: {
    entries: [],
    language: fallbackLanguage
  },
  getters: {
    sortedEntries: state => {
      return [...state.entries].sort((a: Entry, b: Entry) => {
        return a.endDate.getTime() - b.endDate.getTime();
      });
    },
    count: state => {
      return state.entries.length
    },
    earliestEndDateEntry: (state, getters) => {
      return getters.count > 0 ? getters.sortedEntries[0] : null
    },
  },
  mutations: {
    [ADD_NEW_ENTRY](state, newEntry: NewEntry) {
      const date = new Date();
      const endDate = moment(date.getTime()).add(newEntry.periodInMonths, 'months').toDate();
      const entry: Entry = {
        id: generateId(),
        name: newEntry.name,
        description: newEntry.description,
        date,
        endDate
      };
      state.entries.push(entry);
    },
    [ADD_OLD_ENTRY](state, oldEntry: OldEntry) {
      const endDate = moment(oldEntry.date).add(oldEntry.periodInMonths, 'months').toDate();
      const entry: Entry = {
        id: generateId(),
        name: oldEntry.name,
        description: oldEntry.description,
        date: oldEntry.date,
        endDate
      };
      state.entries.push(entry);
    },
    [DELETE_ENTRY](state, id: number) {
      state.entries.splice(state.entries.map(entry => entry.id).indexOf(id), 1);
    },
    [USE_LANGUAGE](state, language: SupportedLanguage) {
      state.language = language;
    }
  },
  actions: {
    [ADD_NEW_ENTRY]({ commit }, newEntry: NewEntry) {
      commit(ADD_NEW_ENTRY, newEntry);
    },
    [ADD_OLD_ENTRY]({ commit }, oldEntry: OldEntry) {
      commit(ADD_OLD_ENTRY, oldEntry);
    },
    [DELETE_ENTRY]({ commit }, id: number) {
      commit(DELETE_ENTRY, id);
    },
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
  }
})
