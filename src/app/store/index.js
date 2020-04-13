import Vue from "vue";
import Vuex from "vuex";
import comics from "./comics";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		comics
	}
});
