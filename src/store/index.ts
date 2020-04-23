import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';

import { Entry, NewEntry, OldEntry } from './../shared/entry';

Vue.use(Vuex)


export const ADD_NEW_ENTRY = 'ADD_NEW_ENTRY';
export const ADD_OLD_ENTRY = 'ADD_OLD_ENTRY';

const generateId = (): number => {
  return new Date().getTime()
};

interface StoreModel {
  entries: Entry[];
}

export default new Vuex.Store<StoreModel>({
  state: {
    entries: []
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
    }
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
    }
  },
  actions: {
    [ADD_NEW_ENTRY]({ commit }, newEntry: NewEntry) {
      commit(ADD_NEW_ENTRY, newEntry);
    },
    [ADD_OLD_ENTRY]({ commit }, oldEntry: OldEntry) {
      commit(ADD_OLD_ENTRY, oldEntry);
    }
  },
  modules: {
  }
})
