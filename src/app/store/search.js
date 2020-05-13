import * as api from '../../utils/api';
import { capitalize } from '../helpers';

export default {
  namespaced: true,

  actions: {
    fetchItems({ commit, state }, { searchQuery, offset, onScroll = false }) {
      const action = onScroll ? 'setScrollLoading' : 'setLoading';
      const methodName = `search${capitalize(state.searchType)}`;

      commit(action, true);
      commit('setError', false);

      api[methodName](searchQuery, offset)
        .then(({ data }) => {
          const dataObject = onScroll
            ? {
                ...data,
                results: [...state.searchResult.items, ...data.results]
              }
            : data;

          commit('setSearchResult', dataObject);
        })
        .catch(error => commit('setError', error))
        .finally(() => commit(action, false));
    },

    getItem({ commit }, { id, itemType }) {
      commit('setLoading', true);
      commit('cleanCurrentItemState');

      const methodName = `get${capitalize(itemType)}ById`;

      commit('setError', false);

      api[methodName](id)
        .then(({ data }) => commit('setCurrentItem', data.results[0]))
        .catch(error => commit('setError', error))
        .finally(() => commit('setLoading', false));
    },

    setSearchType({ commit }, name) {
      commit('setSearchType', name);
    }
  },

  mutations: {
    setLoading(state, value) {
      state.isLoading = value;
    },

    setScrollLoading(state, value) {
      state.scrollLoading = value;
    },

    setSearchResult(state, items) {
      const { results, ...rest } = items;

      state.searchResult = {
        items: results.map(({ title, name, ...restInfo }) => ({
          title: title ? title : name,
          ...restInfo
        })),
        ...rest
      };
    },

    setCurrentItem(state, item) {
      const title = item.title || item.name;
      state.currentItem = { ...item, title };
    },

    cleanCurrentItemState(state) {
      state.currentItem = null;
    },

    setSearchType(state, name) {
      state.searchType = name;
    },

    setError(state, error) {
      state.error = error;
    }
  },

  state: {
    searchResult: null,
    currentItem: null,
    isLoading: false,
    scrollLoading: false,
    error: false,
    searchType: 'all'
  }
};
