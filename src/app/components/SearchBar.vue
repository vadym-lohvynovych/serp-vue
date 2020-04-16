<template>
  <form
    action="#"
    class="search-bar flex items-center justify-center px-4"
    @submit.prevent="search"
  >
    <div class="input-title-wrapper relative">
      <input
        v-model="title"
        class="py-2 px-5 rounded-r rounded-full bg-gray-400 focus:outline-none text-black border border-gray-600 focus:border-gray-700"
        type="text"
        @blur="removeError"
        @focus="removeError"
        placeholder="Title"
      />
      <p v-if="error" class="input-error absolute py-1 px-4 rounded bg-red-400">{{ error }}</p>
    </div>
    <button
      class="py-2 px-5 rounded-l rounded-full bg-gray-400 focus:outline-none text-black border border-gray-600 hover:border-gray-700 font-semibold"
      type="submit"
    >Find</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "",
      error: ""
    };
  },

  computed: {
    ...mapGetters(["nameOfItemsToSearch"]),
    urlTitle() {
      return this.$route.query.title;
    }
  },

  methods: {
    ...mapActions(["fetchItems", "setNameOfItemsToSearch", "watchSomeInfo"]),

    search() {
      this.setNameOfItemsToSearch("Comics");
      this.watchSomeInfo();
      if (this.title.length > 2 && this.title !== this.urlTitle) {
        this.$router.push(`?title=${this.title}`);
        this.fetchItems({ title: this.title });
      } else if (this.title.length < 3) {
        this.error = "Title should be at least 3 characters long";
      }
    },
    removeError() {
      this.error = "";
    }
  },

  mounted() {
    if (this.urlTitle) {
      this.setNameOfItemsToSearch("Comics");
      this.title = this.urlTitle;
    }
    this.fetchItems({ title: this.urlTitle });
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
.input-error {
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.6em;
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-bottom: 5px solid #fc8181;
  }
}
button {
  width: 150px;
  &:hover {
    box-shadow: 0 0 10px #cecece62;
  }
}
</style>
