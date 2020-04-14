import api from "../../api";

export default {
	actions: {
		searchComics(context, title) {
			context.commit("setFetching", true);
			api.searchComics(title)
				.then(res => {
					context.commit("updateComics", res.data);
				})
				.catch(error => {
					context.commit("setError", error);
				})
				.finally(() => {
					context.commit("setFetching", false);
				});
		}
	},
	mutations: {
		setFetching(state, value) {
			state.fetching = value;
		},
		updateComics(state, comics) {
			const { results, ...rest } = comics;
			state.comics = {
				items: results,
				...rest
			};
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
