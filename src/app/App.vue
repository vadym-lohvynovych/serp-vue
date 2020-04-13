<template>
	<div class="container mx-auto">
		<h1 class="text-center text-xl my-5 font-hairline">Here you can find some comics info!</h1>
		<SearchBar />
		<div v-if="areFetching">
			<Loader />
		</div>
		<div v-else-if="allComicses && allComicses.length">
			<p class="text-center font-hairline my-8">{{ allComicses.length }}</p>
		</div>
		<div v-else-if="allComicses">
			<p class="text-center font-hairline my-8">Cant find :(</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchBar from "./components/SearchBar.vue";
import Loader from "./components/Loader.vue";

export default {
	computed: mapGetters(["allComicses", "areFetching"]),
	components: {
		SearchBar,
		Loader
	}
};
</script>


<style lang="scss">
body {
	min-height: 100vh;
	background: linear-gradient(to right bottom, #323d42 0%, #191e24 100%);
	color: #fff;
}
</style>
