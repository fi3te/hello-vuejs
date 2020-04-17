import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';

import { Entry, NewEntry } from './../shared/entry';

Vue.use(Vuex)


export const ADD_ENTRY = 'ADD_ENTRY'


export default new Vuex.Store({
  state: {
    nextId: 4,
    entries: [{
      id: 1,
      name: 'Max',
      description: 'Birthday',
      date: new Date(),
      endDate: moment().add(5, 'months').toDate()
    }, {
      id: 2,
      name: 'Sara',
      description: 'Promotion',
      date: new Date(),
      endDate: moment().add(20, 'months').toDate()
    }, {
      id: 3,
      name: 'Sophie',
      description: 'Punishment',
      date: new Date(),
      endDate: moment().add(4, 'months').toDate()
    }]
  },
  getters: {
    sortedEntries: state => {
      return [...state.entries].sort((a, b) => {
        return a.endDate.getTime() - b.endDate.getTime();
      });
    },
    count: state => {
      return state.entries.length
    },
    earliestEndDateEntry: (state, getters) => {
      return getters.sortedEntries[0]
    }
  },
  mutations: {
    [ADD_ENTRY](state, newEntry: NewEntry) {
      const date = new Date();
      const endDate = moment(date.getTime()).add(newEntry.periodInMonths, 'months').toDate();
      const entry: Entry = {
        id: state.nextId,
        name: newEntry.name,
        description: newEntry.description,
        date,
        endDate
      };
      state.nextId++;
      state.entries.push(entry);
    }
  },
  actions: {
    [ADD_ENTRY]({ commit }, newEntry: NewEntry) {
      commit(ADD_ENTRY, newEntry);
    }
  },
  modules: {
  }
})
