import Vue from "vue";
import Vuex from "vuex";
import comicses from "./comicses";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		comicses
	}
});
