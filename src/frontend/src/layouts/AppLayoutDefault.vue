<template>
  <div class="app-layout-default">
    <AppLayoutHeader :isAuth="isAuth" :totalPrice="getTotalPrice"/>
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from '@/layouts/AppLayoutHeader';
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters("Cart", ["getTotalPrice"]),
  },
};
</script>

<style lang="scss">
</style>
