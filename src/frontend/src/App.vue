<template>
  <div id="app">
    <AppLayout/>
    <div class="content">
      <IndexHome/>
    </div>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout"
import IndexHome from '@/views/Index';

export default {
  name: "App",
  components: {
    AppLayout,
    IndexHome
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
