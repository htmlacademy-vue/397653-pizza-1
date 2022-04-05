<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('change', ingredient.count - 1)"
      :disabled="ingredient.count === minValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="ingredient.count"
      readonly
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="$emit('change', ingredient.count + 1)"
      :disabled="ingredient.count === maxValue"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { MIN_INGREDIENT_VALUE, MAX_INGREDIENT_VALUE } from '@/common/constants'

export default {
  name: 'ItemCounter',
  props: {
    ingredient: {
      type: Object,
      required: true
    }
  },
  computed: {
    minValue() {
      return MIN_INGREDIENT_VALUE
    },
    maxValue() {
      return MAX_INGREDIENT_VALUE
    }
  }
};
</script>

<style>
</style>