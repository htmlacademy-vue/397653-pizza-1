<template>
  <div id="app">
    <Header />
    <main class="content">
      <Index />
    </main>
  </div>
</template>

<script>
import Index from "@/views/Index"
import Header from "@/views/Header"
export default {
  name: "App",
  components: {
    Index,
    Header
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
