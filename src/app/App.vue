<template>
	<div class="container max-width-1200 mx-auto">
		<h1 class="text-center font-bold text-xl">App</h1>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: mapGetters(['allComics'])
}
</script>
