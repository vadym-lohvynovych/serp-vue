<template>
  <div v-if="items && items.length" class="py-2 px-5 rounded bg-gray-900 my-2">
    <h2 class="text-lg mb-2">{{ header | prettyHeader }}</h2>
    <div
      class="text-item mr-2 mb-2 text-sm cursor-pointer inline-block"
      v-for="(item, index) in items"
      :key="index"
      @click="goToItemPage(item.resourceURI)"
    >
      <p
        class="rounded px-8 py-1 shadow-xl bg-blue-900 border border-green-800 hover:bg-blue-700 hover:border-green-600"
      >
        {{ item.name }}
        <span class="text-pink-300" v-if="item.role">Role: {{ item.role }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import changeRoute from '../helpers/changeRoute';

export default {
  props: {
    items: Array,
    header: String,
    isCreator: Boolean
  },

  methods: {
    getTitle: item =>
      item.role ? `${item.name} Role: ${item.role}` : item.name,

    goToItemPage(url) {
      changeRoute(url, this.$route, this.$router);
    }
  },

  filters: {
    prettyHeader(value) {
      return value.charAt(0).toUpperCase() + value.slice(1) + ':';
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  transition: 0.25s;
}
</style>
