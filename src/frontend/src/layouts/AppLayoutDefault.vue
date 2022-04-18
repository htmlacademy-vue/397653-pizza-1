<template>
  <div class="app-layout-default">
    <AppLayoutHeader :isAuth="isAuth"/>
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from '@/layouts/AppLayoutHeader';

export default {
  name: 'AppLayoutDefault',
  components: {
    AppLayoutHeader
  },
  props: {
    isAuth: {
      type: Boolean,
      required: true
    }
  },
};
</script>

<style lang="scss">
</style>
