<template>
  <div id="app">
    <AppLayout :isAuth="isAuth">
      <router-view/>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from '@/layouts/AppLayout';

export default {
  name: "App",
  data() {
    return {
      isAuth: false
    }
  },
  components: {
    AppLayout
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
