import { findComics, getRandomCharacters } from '../../utils/api';

export default {
  actions: {
    fetchComics(context, title) {
      context.commit('setFetching', true);
      findComics(title)
        .then((res) => {
          context.commit('updateItems', { items: res.data, statePropName: 'comics' });
        })
        .catch((error) => {
          context.commit('setError', error);
        })
        .finally(() => {
          context.commit('setFetching', false);
        });
    },

    fetchRandomCharacters(context) {
      context.commit('setFetching', true);
      getRandomCharacters()
        .then((res) => {
          context.commit('updateItems', { items: res.data, statePropName: 'characters' });
        })
        .catch((error) => {
          context.commit('setError', error);
        })
        .finally(() => {
          context.commit('setFetching', false);
        });
    },

    makeItemVisible(context, index, interval = 80) {
      context.commit('makeItemVisible', { index, interval });
    },
  },
  mutations: {
    setFetching(state, value) {
      state.fetching = value;
    },

    updateItems(state, { items }) {
      const { results, ...rest } = items;

      state.searchResult = {
        items: results.map(({ id, title, name, thumbnail }, index) => ({ id, title: title ? title : name, thumbnail, index, visibility: 'hidden' })),
        ...rest,
      };
    },

    makeItemVisible(state, { index, interval }) {
      setTimeout(() => {
        state.searchResult.items[index].visibility = 'visible';
      }, interval * index + 1);
    },

    setError(state, error) {
      state.error = error;
    },
  },
  state: {
    searchResult: null,
    fetching: false,
    error: false,
  },
  getters: {
    searchResult(state) {
      return state.searchResult && state.searchResult.items;
    },
    isLoading(state) {
      return state.fetching;
    },
  },
};
