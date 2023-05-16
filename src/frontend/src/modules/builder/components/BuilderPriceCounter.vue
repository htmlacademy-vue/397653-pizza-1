<template>
  <p>Итого: {{ getPrice }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'BuilderPriceCounter',

  computed: {
    ...mapGetters("builder", ["getPrice"]),
  },
};
</script>

<style>
</style>
