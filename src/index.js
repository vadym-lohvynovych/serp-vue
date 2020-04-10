import Vue from "vue"
import Api from "./api";
import "./app/scss/main.scss";
import App from "./app/App.vue";

const api = new Api();

api.getCharacters().then(res => {
	console.log("Api is Ready!");
	console.log(res);
});

new Vue({
	render: h => h(App)
}).$mount("#app");
