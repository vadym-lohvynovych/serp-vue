<template>
  <div class="flex items-center items-center justify-center py-6">
    <p
      v-for="n in pagesCount"
      :key="n"
      @click="changePage(n)"
      :class="{active: isActive(n), 'bg-indigo-600': isActive(n)}"
      class="py-1 px-2 rounded mx-1 bg-indigo-300 text-black shadow-xl cursor-pointer hover:bg-indigo-500 with-transition"
    >{{ n }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    limit: Number,
    offset: Number,
    total: Number
  },

  computed: {
    pagesCount() {
      return Math.floor(this.total / this.limit) + 1;
    },

    currentPage() {
      return this.$route.query.page || 1;
    }
  },

  methods: {
    ...mapActions('search', ['fetchItems', 'setSearchType']),

    changePage(pageNumber) {
      const title = this.$route.query.title;

      this.$router.push({ query: { title, page: pageNumber } });

      this.fetchItems({
        title,
        offset: (pageNumber - 1) * this.limit
      });
    },

    isActive(n) {
      return n == this.currentPage;
    }
  }
};
</script>
 