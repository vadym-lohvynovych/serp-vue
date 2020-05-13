import * as api from '../../utils/api';
import { capitalize } from '../helpers';

export default {
  namespaced: true,

  actions: {
    fetchItems({ commit, state }, { searchQuery, offset }) {
      commit('setLoading', true);

      const methodName = `search${capitalize(state.searchType)}`;

      commit('setError', false);

      api[methodName](searchQuery, offset)
        .then(({ data }) => commit('updateSearchResult', data))
        .catch(error => commit('setError', error))
        .finally(() => commit('setLoading', false));
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

    fetchMore({ commit, state }, { searchQuery, offset }) {
      commit('setScrollLoading', true);

      const methodName = `search${capitalize(state.searchType)}`;

      commit('setError', false);

      api[methodName](searchQuery, offset)
        .then(({ data }) =>
          commit('updateSearchResult', {
            ...data,
            results: [...state.searchResult.items, ...data.results]
          })
        )
        .catch(error => commit('setError', error))
        .finally(() => commit('setScrollLoading', false));
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

    updateSearchResult(state, items) {
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
