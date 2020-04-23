import { Entry, NewEntry, OldEntry } from '@/shared/entry';
import moment from 'moment';
import { ActionContext } from 'vuex';

import { EntriesState, RootState } from './../model';

export const ADD_NEW_ENTRY = 'ADD_NEW_ENTRY';
export const ADD_OLD_ENTRY = 'ADD_OLD_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';

const generateId = (): number => {
    return new Date().getTime()
};

const state = () => ({
    content: [],
});

const getters = {
    sortedEntries: (state: EntriesState) => {
        return [...state.content].sort((a: Entry, b: Entry) => {
            return a.endDate.getTime() - b.endDate.getTime();
        });
    },
    count: (state: EntriesState) => {
        return state.content.length
    },
    earliestEndDateEntry: (state: EntriesState, getters: any) => {
        return getters.count > 0 ? getters.sortedEntries[0] : null
    },
};

const mutations = {
    [ADD_NEW_ENTRY](state: EntriesState, newEntry: NewEntry) {
        const date = new Date();
        const endDate = moment(date.getTime()).add(newEntry.periodInMonths, 'months').toDate();
        const entry: Entry = {
            id: generateId(),
            name: newEntry.name,
            description: newEntry.description,
            date,
            endDate
        };
        state.content.push(entry);
    },
    [ADD_OLD_ENTRY](state: EntriesState, oldEntry: OldEntry) {
        const endDate = moment(oldEntry.date).add(oldEntry.periodInMonths, 'months').toDate();
        const entry: Entry = {
            id: generateId(),
            name: oldEntry.name,
            description: oldEntry.description,
            date: oldEntry.date,
            endDate
        };
        state.content.push(entry);
    },
    [DELETE_ENTRY](state: EntriesState, id: number) {
        state.content.splice(state.content.map(entry => entry.id).indexOf(id), 1);
    },
};

const actions = {
    [ADD_NEW_ENTRY]({ commit }: ActionContext<EntriesState, RootState>, newEntry: NewEntry) {
        commit(ADD_NEW_ENTRY, newEntry);
    },
    [ADD_OLD_ENTRY]({ commit }: ActionContext<EntriesState, RootState>, oldEntry: OldEntry) {
        commit(ADD_OLD_ENTRY, oldEntry);
    },
    [DELETE_ENTRY]({ commit }: ActionContext<EntriesState, RootState>, id: number) {
        commit(DELETE_ENTRY, id);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
} 