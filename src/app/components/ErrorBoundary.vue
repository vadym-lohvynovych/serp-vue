<template>
  <div>
    <h1
      class="text-center my-8 text-2xl text-red-300"
      v-if="error"
    >Something bad happened. Please, try again later.</h1>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  props: ['error']
};
</script>
