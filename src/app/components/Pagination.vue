<template>
  <div class="flex items-center items-center justify-center">
    <div
      v-if="currentPage !== 1"
      @click="changePage(currentPage - 1)"
      class="arrow arrow-left py-1 px-2 mx-1 bg-indigo-300 hover:bg-indigo-600 with-transition rounded-full cursor-pointer"
    ></div>

    <div v-if="pagesCount < 7" class="flex items-center items-center justify-center py-6">
      <p
        v-for="n in pagesCount"
        :key="n"
        @click="changePage(n)"
        :class="paginationClassObject(n)"
      >{{ n }}</p>
    </div>

    <div v-else class="flex items-center items-center justify-center py-6">
      <div v-for="(page, idx) in pagesArray" :key="idx">
        <p
          v-if="typeof page === 'number'"
          @click="changePage(page)"
          :class="paginationClassObject(page)"
        >{{ page }}</p>
        <p v-else-if="page === 'dots' && shoultRenderDots(idx)" class="py-1 px-2 mx-1">...</p>
      </div>
    </div>

    <div
      v-if="currentPage !== pagesCount"
      @click="changePage(currentPage + 1)"
      class="arrow arrow-right py-1 px-2 mx-1 bg-indigo-300 hover:bg-indigo-600 with-transition rounded-full cursor-pointer"
    ></div>
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
      return Number(this.$route.query.page) || 1;
    },

    pagesArray() {
      if (this.currentPage <= 3) {
        return [
          1,
          2,
          3,
          4,
          'dots',
          this.pagesCount - 2,
          this.pagesCount - 1,
          this.pagesCount
        ];
      } else if (this.currentPage >= this.pagesCount - 2) {
        return [
          1,
          'dots',
          this.pagesCount - 3,
          this.pagesCount - 2,
          this.pagesCount - 1,
          this.pagesCount
        ];
      } else {
        return [
          1,
          'dots',
          this.currentPage - 2,
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          this.currentPage + 2,
          'dots',
          this.pagesCount
        ];
      }
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

    paginationClassObject(n) {
      return {
        active: this.isActive(n),
        'bg-indigo-600': this.isActive(n),
        'py-1 px-2 rounded mx-1 bg-indigo-300 text-black shadow-xl cursor-pointer hover:bg-indigo-500 with-transition': true
      };
    },

    shoultRenderDots(dotsIndex) {
      if (dotsIndex === 1) {
        return this.pagesArray[dotsIndex + 1] !== 2;
      } else {
        return this.pagesArray[dotsIndex - 1] !== this.pagesCount - 1;
      }
    },

    isActive(n) {
      return n == this.currentPage;
    }
  }
};
</script>

<style lang="scss" scoped>
.arrow {
  position: relative;
  width: 20px;
  height: 20px;
  &:after {
    position: absolute;
    content: '';
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 35%;
    height: 35%;
    border: 2px solid rgb(30, 22, 51);
  }
  &-left:after {
    border-right: none;
    border-bottom: none;
  }
  &-right:after {
    border-left: none;
    border-top: none;
  }
}
</style>
 