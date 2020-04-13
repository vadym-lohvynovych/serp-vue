export default {
    actions: {},
    mutations: {},
    state: {
        items: [],
        fetching: false,
        error: false
    },
    getters: {
        allComics(state) {
            return state.items
        }
    }
}