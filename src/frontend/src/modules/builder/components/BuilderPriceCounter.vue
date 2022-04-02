<template>
  <p>Итого: {{ getThePrice() }} ₽</p>
</template>

<script>
import { DOUGH_PRICE, SAUCE_PRICE } from '@/common/constants'

export default {
  props: {
    multiplier: {
      type: Number,
      required: true
    },

    ingredientPrice: {
      type: Number,
      required: true
    }
  },
  methods: {
    getThePrice() {
      return this.multiplier * (DOUGH_PRICE + SAUCE_PRICE + this.ingredientPrice)
    }
  }
};
</script>

<style>
</style>