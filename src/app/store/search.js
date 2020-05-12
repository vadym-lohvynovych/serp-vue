import * as api from '../../utils/api';

export default {
  namespaced: true,

  actions: {
    fetchItems({ commit, state }, { searchQuery, offset }) {
      commit('setLoading', true);

      const type =
        state.searchType.charAt(0).toUpperCase() + state.searchType.slice(1);

      const methodName = `search${type}`;

      commit('setError', false);

      api[methodName](searchQuery, offset)
        .then(({ data }) => commit('updateItems', data))
        .catch(error => commit('setError', error))
        .finally(() => commit('setLoading', false));
    },

    getItem({ commit }, { id, itemType }) {
      commit('setLoading', true);
      commit('cleanCurrentItemState');

      const type = itemType.charAt(0).toUpperCase() + itemType.slice(1);

      const methodName = `get${type}ById`;

      commit('setError', false);

      api[methodName](id)
        .then(({ data }) => commit('setCurrentItem', data.results[0]))
        .catch(error => commit('setError', error))
        .finally(() => commit('setLoading', false));
    },

    setSearchType({ commit }, name) {
      commit('setSearchType', name);
    },

    makeItemVisible(context, index, interval = 80) {
      context.commit('makeItemVisible', { index, interval });
    }
  },

  mutations: {
    setLoading(state, value) {
      state.isLoading = value;
    },

    updateItems(state, items) {
      const { results, ...rest } = items;

      state.searchResult = {
        items: results.map(({ title, name, ...restInfo }, index) => ({
          title: title ? title : name,
          index,
          visibility: 'hidden',
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

    makeItemVisible(state, { index, interval }) {
      setTimeout(() => {
        state.searchResult.items[index].visibility = 'visible';
      }, interval * index + 1);
    },

    setError(state, error) {
      state.error = error;
    }
  },

  state: {
    searchResult: null,
    currentItem: null,
    isLoading: false,
    error: false,
    searchType: 'all'
  }
};
