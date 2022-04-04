<template>
  <div id="app">
    <AppLayoutHeader/>
    <div class="content">
      <IndexHome/>
    </div>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader"
import IndexHome from '@/views/Index';

export default {
  name: "App",
  components: {
    AppLayoutHeader,
    IndexHome
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
