<template>
  <p>Итого: {{ totalPrice }} ₽</p>
</template>

<script>
export default {
  props: {
    totalPrice: {
      type: Number
    }
  }
};
</script>

<style>
</style>