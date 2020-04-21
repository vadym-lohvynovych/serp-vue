import * as api from '../../utils/api';
import apiStructure from '../../utils/apiStructure';

export default {
  actions: {
    fetchItems({ commit, state }, { title, offset }) {
      commit('setFetching', true);

      const method = api[apiStructure[state.searchType]];

      method(title, offset)
        .then(({ data }) => commit('updateItems', data))
        .catch(error => commit('setError', error))
        .finally(() => commit('setFetching', false));
    },

    setSearchType({ commit }, name) {
      commit('setSearchType', name);
    },

    makeItemVisible(context, index, interval = 80) {
      context.commit('makeItemVisible', { index, interval });
    }
  },

  mutations: {
    setFetching(state, value) {
      state.isLoading = value;
    },

    updateItems(state, items) {
      const { results, ...rest } = items;

      state.searchResult = {
        items: results.map(({ id, title, name, thumbnail }, index) => ({
          id,
          title: title ? title : name,
          thumbnail,
          index,
          visibility: 'hidden'
        })),
        ...rest
      };
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
    isLoading: false,
    error: false,
    searchType: 'all'
  }
};
