<template>
  <div v-if="total > limit" class="flex items-center items-center justify-center py-6">
    <div
      v-if="currentPage !== 1"
      @click="changePage(currentPage - 1)"
      class="arrow arrow-left py-1 px-2 mx-1 bg-indigo-300 hover:bg-indigo-600 with-transition rounded-full cursor-pointer"
    ></div>

    <div v-for="(page, idx) in getPages(pagesCount, currentPage)" :key="idx">
      <p
        v-if="typeof page === 'number'"
        @click="changePage(page)"
        :class="paginationClassObject(page)"
      >{{ page }}</p>
      <p v-else-if="page === '...'" class="py-1 px-2 mx-1">...</p>
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
      return ~~(this.total / this.limit) + 1;
    },

    currentPage() {
      return Number(this.$route.query.page) || 1;
    }
  },

  methods: {
    changePage(pageNumber) {
      this.$emit('changePage', pageNumber);
    },

    paginationClassObject(n) {
      return {
        'active bg-indigo-500': n == this.currentPage,
        'py-1 px-2 rounded mx-1 bg-indigo-300 text-black shadow-xl cursor-pointer hover:bg-indigo-500 with-transition': true
      };
    },

    getPages(count, current, distance = 2, pagesWithoutDots = 8) {
      if (count <= pagesWithoutDots) {
        return [...Array(count).keys()].map(i => ++i);
      }
      if (count === 1) {
        return [1];
      }
      const lenseSize = 1 + distance * 2;
      const lense = [...Array(lenseSize).keys()]
        .map(i => i + current - distance) // this line handled all my problems, brilliant
        .filter(i => i > 1 && i < count);

      return count > lenseSize
        ? [
            1,
            ...(lense[0] === 2 ? [] : ['...']),
            ...lense,
            ...(lense[lense.length - 1] === count - 1 ? [] : ['...']),
            count
          ]
        : [1, ...lense, count];
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
 