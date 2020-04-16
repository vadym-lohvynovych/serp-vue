import * as api from '../../utils/api';
import apiStructure from '../../utils/apiStructure';

export default {
  actions: {
    fetchItems({ commit, state }, { title, offset }) {
      commit('setFetching', true);

      const method = api[apiStructure[state.nameOfItemsToSearch]];

      method(title, offset)
        .then(res => {
          commit('updateItems', res.data);
        })
        .catch(error => {
          commit('setError', error);
        })
        .finally(() => {
          commit('setFetching', false);
        });
    },

    setNameOfItemsToSearch({ commit }, name) {
      commit('setNameOfItemsToSearch', name);
    },

    makeItemVisible(context, index, interval = 80) {
      context.commit('makeItemVisible', { index, interval });
    }
  },

  mutations: {
    setFetching(state, value) {
      state.fetching = value;
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

    setNameOfItemsToSearch(state, name) {
      state.nameOfItemsToSearch = name;
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
    fetching: false,
    error: false,
    nameOfItemsToSearch: 'random'
  },

  getters: {
    searchResult(state) {
      return state.searchResult && state.searchResult.items;
    },
    isLoading(state) {
      return state.fetching;
    },
    error(state) {
      return state.error;
    },
    nameOfItemsToSearch(state) {
      return state.nameOfItemsToSearch;
    }
  }
};
