<template>
  <form
    action="#"
    class="search-bar flex items-center justify-center px-4"
    @submit.prevent="search"
  >
    <input
      v-model="title"
      class="py-2 px-5 rounded-r rounded-full bg-gray-400 focus:outline-none text-black border border-gray-600 focus:border-gray-700"
      type="text"
      placeholder="Title"
    />
    <button
      class="py-2 px-5 rounded-l rounded-full bg-gray-400 focus:outline-none text-black border border-gray-600 hover:border-gray-700 font-semibold"
      type="submit"
    >Find</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: ""
    };
  },

  computed: {
    urlTitle() {
      return this.$route.query.title;
    }
  },

  methods: {
    ...mapActions(["findComics"]),
    search() {
      if(this.$route.query.title === this.title) return;
      
      this.$router.push(`?title=${this.title}`);
      this.findComics(this.title);
    }
  },

  mounted() {
    if (this.urlTitle) {
      this.title = this.urlTitle;
    }
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
  width: 250px;
}
button {
  width: 150px;
  &:hover {
    box-shadow: 0 0 10px #cecece62;
  }
}
</style>
