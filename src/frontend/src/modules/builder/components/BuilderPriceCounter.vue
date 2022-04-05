<template>
  <p>Итого: {{ totalPrice }} ₽</p>
</template>

<script>
export default {
  name: 'BuilderPriceCounter',
  props: {
    totalPrice: {
      type: Number
    }
  }
};
</script>

<style>
</style>