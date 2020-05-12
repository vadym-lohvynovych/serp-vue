<template>
  <div>
    <h2 class="text-center text-xl my-5 font-hairline">Hello there!</h2>

    <ErrorBoundary :error="error">
      <Loader v-if="isLoading" />

      <div v-else-if="searchResult && searchResult.items && searchResult.items.length">
        <div class="search-result-items flex flex-wrap py-8">
          <SearchResultItem
            v-for="searchItem in searchResult.items"
            :key="searchItem.id"
            :item="searchItem"
          />
        </div>

        <Pagination
          v-if="searchType !== 'all'"
          :limit="searchResult.limit"
          :offset="searchResult.offset"
          :total="searchResult.total"
          @changePage="changePage"
        />
      </div>

      <p v-else-if="searchResult" class="text-center font-hairline my-8">Nothing to show :(</p>
    </ErrorBoundary>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loader from '../components/Loader.vue';
import SearchResultItem from '../components/SearchResultItem.vue';
import ErrorBoundary from '../components/ErrorBoundary.vue';
import Pagination from '../components/Pagination.vue';
import lazyImageLoading from '../helpers/lazyImageLoading';

export default {
  data() {
    return {
      isLazyEventListenerActive: false,
      contentBlock: null,
      lazy: null
    };
  },
  computed: {
    ...mapState('search', ['searchResult', 'isLoading', 'error', 'searchType']),
    title() {
      return this.$route.query.title;
    }
  },

  methods: {
    ...mapActions('search', ['fetchItems']),

    changePage(page) {
      const { searchType, searchQuery } = this.$route.query;

      this.$router.push({ query: { searchType, searchQuery, page } });

      this.fetchItems({
        searchQuery,
        offset: (page - 1) * this.searchResult.limit
      });
    }
  },

  watch: {
    searchResult(value) {
      value.items.length && setTimeout(this.lazy.update);
    }
  },

  mounted() {
    this.contentBlock = document.querySelector('.content');
    this.lazy = lazyImageLoading('img[data-lazy]', 'lazy', this.contentBlock);
  },

  destroyed() {
    this.lazy.unsubscribe();
  },

  components: {
    Loader,
    SearchResultItem,
    ErrorBoundary,
    Pagination
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
