<template>
  <component
    :is="layout"
    :isAuth="isAuth"
  >
    <slot />
  </component>
</template>

<script>

const defaultLayout = 'AppLayoutDefault';

export default {
  name: 'AppLayout',
  props: {
    isAuth: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  }
}
</script>

<style>

</style>
