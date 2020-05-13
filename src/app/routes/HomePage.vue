<template>
  <div>
    <ErrorBoundary :error="error">
      <Loader v-if="isLoading" />

      <div v-else-if="searchResult && searchResult.items && searchResult.items.length">
        <p
          v-if="searchType === 'all'"
          class="text-center pb-4 lg:pb-8 text-xl"
        >Take a look at some random characters!</p>
        <div class="search-result-items flex flex-wrap">
          <SearchResultItem
            v-for="searchItem in searchResult.items"
            :key="searchItem.id"
            :item="searchItem"
          />
        </div>
      </div>

      <p
        v-else-if="searchResult && !searchResult.items.length"
        class="text-center font-hairline my-8"
      >Nothing to show :(</p>

      <Loader v-if="scrollLoading" />

      <InfinityScroll
        v-else-if="!isLoading && searchType !== 'all' && searchResult && searchResult.items.length !== searchResult.total"
        @scrolled="loadNextItems"
      />
    </ErrorBoundary>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loader from '../components/Loader.vue';
import SearchResultItem from '../components/SearchResultItem.vue';
import ErrorBoundary from '../components/ErrorBoundary.vue';
import Pagination from '../components/Pagination.vue';
import InfinityScroll from '../components/InfinityScroll.vue';
import { lazyImageLoading } from '../helpers';

export default {
  data() {
    return {
      isLazyEventListenerActive: false,
      lazy: null
    };
  },
  computed: {
    ...mapState('search', [
      'searchResult',
      'isLoading',
      'scrollLoading',
      'error',
      'searchType'
    ]),
    title() {
      return this.$route.query.title;
    }
  },

  methods: {
    ...mapActions('search', ['fetchItems', 'fetchMore']),

    loadNextItems() {
      this.fetchItems({
        searchQuery: this.$route.query.searchQuery,
        offset: this.searchResult.items.length,
        onScroll: true
      });
    }
  },

  watch: {
    searchResult(value) {
      value.items.length && setTimeout(this.lazy.update);
    }
  },

  mounted() {
    this.lazy = lazyImageLoading('img[data-lazy]', 'lazy');
  },

  destroyed() {
    this.lazy.unsubscribe();
  },

  components: {
    Loader,
    SearchResultItem,
    ErrorBoundary,
    Pagination,
    InfinityScroll
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
