import api from "../../api";

export default {
	actions: {
		searchComicses(context, title) {
			context.commit("setFetching", true);
			api.searchComicses(title)
				.then(res => {
					context.commit("updateComicses", res.data);
					context.commit("setFetching", false);
				})
				.catch(error => {
					context.commit("setError", error);
					context.commit("setFetching", false);
				});
		}
	},
	mutations: {
		setFetching(state, value) {
			state.fetching = value;
		},
		updateComicses(state, comicses) {
			const { results, ...rest } = comicses;
			state.comicses = {
				items: results,
				...rest
			};
		},
		setError(state, error) {
			state.error = error;
		}
	},
	state: {
		comicses: null,
		fetching: false,
		error: false
	},
	getters: {
		allComicses(state) {
			return state.comicses && state.comicses.items;
		},
		areFetching(state) {
			return state.fetching;
		}
	}
};
