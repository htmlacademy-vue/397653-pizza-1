<template>
  <div id="app">
    <div class="main">
      <Index />
    </div>
  </div>
</template>

<script>
import Index from "@/views/Index"
export default {
  name: "App",
  components: {
    Index
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
