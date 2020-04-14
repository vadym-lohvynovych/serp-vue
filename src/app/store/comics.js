import { searchComics } from '../../utils/api';

export default {
  actions: {
    findComics(context, title) {
      context.commit('setFetching', true);
      searchComics(title)
        .then(res => {
          context.commit('updateComics', res.data);
        })
        .catch(error => {
          context.commit('setError', error);
        })
        .finally(() => {
          context.commit('setFetching', false);
        });
    },

    makeItemVisible(context, index, interval = 80) {
      context.commit('makeItemVisible', { index, interval });
    }
  },
  mutations: {
    setFetching(state, value) {
      state.fetching = value;
    },

    updateComics(state, comics) {
      const { results, ...rest } = comics;
      state.comics = {
        items: results.map(({ id, title, thumbnail }, index) => ({ id, title, thumbnail, index, visibility: 'hidden' })),
        ...rest
      };
    },

    makeItemVisible(state, { index, interval }) {
      setTimeout(() => {
        state.comics.items[index].visibility = 'visible';
      }, interval * index + 1);
    },

    setError(state, error) {
      state.error = error;
    }
  },
  state: {
    comics: null,
    fetching: false,
    error: false
  },
  getters: {
    searchResult(state) {
      return state.comics && state.comics.items;
    },
    isLoading(state) {
      return state.fetching;
    }
  }
};
