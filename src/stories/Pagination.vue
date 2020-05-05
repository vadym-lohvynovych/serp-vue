<template>
  <div>
    <div v-if="pagesCount < 6" class="pagination py-6">
      <p
        v-for="n in pagesCount"
        :key="n"
        @click="changePage(n)"
        :class="{active: isActive(n), 'bg-indigo-600': isActive(n)}"
        class="py-1 px-2 rounded mx-1 bg-indigo-300 text-black shadow-xl cursor-pointer hover:bg-indigo-500 with-transition"
      >{{ n }}</p>
    </div>
    <div v-else class="pagination py-6">123</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1
    };
  },
  props: {
    limit: [Number, String],
    total: [Number, String]
  },

  computed: {
    pagesCount() {
      return Math.floor(this.total / this.limit);
    }
  },

  methods: {
    changePage(pageNumber) {
      this.page = pageNumber;
    },

    isActive(n) {
      return n == this.page;
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, 'Helvetica Neue', Helvetica;
}

.pagination p {
  background-color: rgb(154, 58, 192);
  padding: 5px 10px;
  border-radius: 4px;
  margin: 0 10px;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
}
.pagination p:hover {
  background-color: rgb(112, 40, 141);
}
.pagination p.active {
  background-color: rgb(214, 112, 255);
}
</style>
