<template>
  <form
    action="#"
    class="search-bar flex items-center justify-center text-sm"
    @submit.prevent="search"
  >
    <div class="input-title-wrapper relative">
      <input
        v-model="searchQuery"
        class="py-1 px-5 rounded-full rounded-r bg-gray-400 focus:outline-none text-black border border-gray-600 focus:border-gray-700"
        type="text"
        @blur="removeError"
        @focus="removeError"
        placeholder="Search Query"
      />
      <p v-if="error" class="input-error absolute py-1 px-2 rounded bg-red-400">{{ error }}</p>
    </div>
    <button
      class="py-1 px-6 rounded-full rounded-l bg-gray-400 focus:outline-none text-black border border-gray-600 hover:border-gray-700 font-semibold"
      type="submit"
    >Find</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      searchQuery: '',
      error: ''
    };
  },

  computed: {
    ...mapState('search', ['searchResult', 'searchType']),
    urlQuery() {
      return this.$route.query.searchQuery;
    },
    urlSearchType() {
      return this.$route.query.searchType;
    }
  },

  methods: {
    ...mapActions('search', ['fetchItems', 'setSearchType']),

    search() {
      this.searchType === 'all' && this.setSearchType('comics');
      if (this.searchQuery.length > 2) {
        this.$router.push({
          path: '/',
          query: { searchType: this.searchType, searchQuery: this.searchQuery }
        });
        this.fetchItems({ searchQuery: this.searchQuery });
        this.$emit('callback');
      } else if (this.searchQuery.length < 3) {
        this.error = 'Search query should be at least 3 characters long';
      }
    },

    removeError() {
      this.error = '';
    }
  },

  mounted() {
    this.urlSearchType && this.setSearchType(this.urlSearchType);
    this.searchQuery = this.urlQuery || '';

    const page = this.$route.query.page;
    const limit = this.searchResult?.limit || 20;

    this.fetchItems({
      searchQuery: this.urlQuery,
      offset: page ? (page - 1) * limit : 0
    });
  }
};
</script>

<style lang="scss" computed>
input,
button {
  box-shadow: 0 0 5px #cecece62;
  transition: 0.2s;
}
input {
  width: 100%;
}
.input-error {
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.6em;
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-bottom: 5px solid #fc8181;
  }
}
button {
  &:hover {
    box-shadow: 0 0 10px #cecece62;
  }
}
</style>
