<template>
  <div id="app">
    <AppLayout/>
    <div class="content">
      <Index/>
    </div>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout"
import Index from '@/views/Index';

export default {
  name: "App",
  components: {
    AppLayout,
    Index
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
