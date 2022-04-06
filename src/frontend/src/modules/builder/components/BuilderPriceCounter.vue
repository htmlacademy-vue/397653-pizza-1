<template>
  <p>Итого: {{ totalPrice }} ₽</p>
</template>

<script>
export default {
  name: 'BuilderPriceCounter',
  props: {
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    }
  }
};
</script>

<style>
</style>