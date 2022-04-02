<template>
  <div class="app-layout">
    <AppLayoutHeader/>
    <div class="content">
      <IndexHome/>
    </div>
  </div>
</template>

<script>
import AppLayoutHeader from '@/layouts/AppLayoutHeader';
import IndexHome from '@/views/Index';

export default {
  name: 'AppLayout',
  components: {
    AppLayoutHeader,
    IndexHome
  },
};
</script>

<style lang="scss" scoped>
</style>