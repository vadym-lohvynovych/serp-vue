<template>
  <div>
    <h2 class="text-center text-xl my-5 font-hairline">Here you can find some comics!</h2>

    <SearchBar />

    <Loader v-if="isLoading" />

    <div v-else-if="searchResult && searchResult.length" class="search-result-items flex flex-wrap py-8">
      <SearchResultItem v-for="searchItem in searchResult" :key="searchItem.id" :item="searchItem" />
    </div>

    <p v-else-if="searchResult" class="text-center font-hairline my-8">Cant find :(</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchBar from "../components/SearchBar.vue";
import Loader from "../components/Loader.vue";
import SearchResultItem from "../components/SearchResultItem.vue";

export default {
  computed: {
    ...mapGetters(["searchResult", "isLoading"]),
    title() {
      return this.$route.query.title;
    }
  },
  components: {
    SearchBar,
    Loader,
    SearchResultItem
  },
  methods: mapActions(["findComics"]),
  mounted() {
    if (this.title) {
      this.findComics(this.title);
    }
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
