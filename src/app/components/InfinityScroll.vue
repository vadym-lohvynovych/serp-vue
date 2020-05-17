<template>
  <div ref="b" class="py-8" data-infinity-scroll></div>
</template>

<script>
export default {
  methods: {
    onScroll() {
      const { bottom } = this.$refs.b.getBoundingClientRect();
      if (bottom < window.innerHeight) this.$emit('scrolled');
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  }
};
</script>
