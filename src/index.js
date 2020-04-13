import Vue from "vue";
import "./app/scss/main.scss";
import App from "./app/App.vue";
import store from "./app/store";

new Vue({
	store,
	render: h => h(App)
}).$mount("#app");
